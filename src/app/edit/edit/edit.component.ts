import { loadProductById } from './../../store/products.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/models';
import { deleteProduct, updateProduct } from 'src/app/store/products.actions';
import { AppState } from 'src/app/store/products.reducer';
import {
  selectProductById,
  selectProductsDeleting,
  selectProductsError,
  selectProductsLoading,
  selectProductsUpdating,
} from 'src/app/store/products.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  product: Product;
  subsciptionSelectProductById: any;

  loading$: Observable<boolean>;
  updating$: Observable<boolean>;
  deleting$: Observable<boolean>;

  error$: Observable<string>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private loc: Location) {
    this.loading$ = this.store.select(selectProductsLoading);
    this.updating$ = this.store.select(selectProductsUpdating);
    this.deleting$ = this.store.select(selectProductsDeleting);
    this.error$ = this.store.select(selectProductsError);

    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$'),
      ]),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadProductById({ id }));
      this.subsciptionSelectProductById = this.store.select(selectProductById(id)).subscribe((product) => {
        if (product) {
          this.product = product;
          this.productForm.patchValue(product);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subsciptionSelectProductById.unsubscribe();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.store.dispatch(updateProduct({ product: { ...this.productForm.value, id: this.product.id } }));
    }
  }

  onCancel(): void {
    this.loc.back();
  }

  onDelete(): void {
    this.store.dispatch(deleteProduct({ product: this.product }));
  }
}

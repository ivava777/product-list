import { selectProductsAdding, selectProductsError } from './../../store/products.selectors';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/models';
import { createProduct } from 'src/app/store/products.actions';
import { AppState } from 'src/app/store/products.reducer';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  productForm: FormGroup;
  adding$: Observable<boolean>;
  error$: Observable<string>;
  product: Product;

  constructor(private loc: Location, private store: Store<AppState>) {
    this.adding$ = this.store.select(selectProductsAdding);
    this.error$ = this.store.select(selectProductsError);
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$'),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.store.dispatch(createProduct({ product: { ...this.productForm.value } }));
  }

  onCancel(): void {
    this.loc.back();
  }
}

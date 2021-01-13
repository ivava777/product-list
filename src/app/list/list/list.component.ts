import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { initListPage, PageSizes, Product } from 'src/app/models/models';
import { fetchProductsView, setProductsViewParams } from 'src/app/store/products.actions';
import { AppState } from 'src/app/store/products.reducer';
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  selectProductsViewTable,
} from 'src/app/store/products.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  products$: Observable<Product[]>;
  queryParamsSub: Subscription;
  pageNum: number = initListPage.pageNum;
  pageSize: number = initListPage.pageSize;
  error$: Observable<string>;

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);
    this.queryParamsSub = this.route.queryParams.subscribe((params) => {
      this.pageNum = +params?.pageNum || this.pageNum;
      this.pageSize = +params?.pageSize || this.pageSize;
      this.store.dispatch(fetchProductsView({ pageNum: this.pageNum, pageSize: this.pageSize }));
      this.products$ = this.store.select(selectProductsViewTable());
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.queryParamsSub.unsubscribe();
  }

  onNewProduct(): void {
    this.router.navigate(['create']);
  }

  onEditProduct(product: Product): void {
    this.router.navigate([`edit/${product.id}`]);
  }
}

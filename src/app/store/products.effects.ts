import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { ProductsService } from '../services/products.service';
import {
  createProduct,
  createProductFail,
  createProductSuccess,
  deleteProduct,
  deleteProductFail,
  deleteProductSuccess,
  fetchProductsView,
  loadProductById,
  loadProductByIdFail,
  loadProductByIdSuccess,
  loadProducts,
  loadProductsFail,
  loadProductsSuccess,
  setProductsViewParams,
  updateProduct,
  updateProductFail,
  updateProductSuccess,
  updateProductsView,
} from './products.actions';
import { AppState } from './products.reducer';
import { selectProducts, selectProductsViewPageNum, selectProductsViewPageSize } from './products.selectors';

@Injectable()
export class ProductsEffects {
  setProductsViewParams$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setProductsViewParams),
        tap((action) =>
          this.router.navigate(['list'], { queryParams: { pageNum: action.pageNum, pageSize: action.pageSize } })
        )
      ),
    { dispatch: false }
  );

  fetchProductsView$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProductsView),
      withLatestFrom(this.store.select(selectProducts)),
      switchMap(([action, products]) => {
        const resArr = products.slice(
          action.pageSize * (action.pageNum - 1),
          action.pageSize * (action.pageNum - 1) + action.pageSize
        );
        if (resArr.length === action.pageSize) {
          return of(updateProductsView({ pageNum: action.pageNum, pageSize: action.pageSize }));
        } else {
          return of(loadProducts({ pageNum: action.pageNum, pageSize: action.pageSize }));
        }
      })
    )
  );

  loadProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap((action) =>
        this.api.get(action.pageNum, action.pageSize).pipe(
          map((data) => loadProductsSuccess({ pageNum: action.pageNum, pageSize: action.pageSize, data })),
          catchError((error: HttpErrorResponse) => of(loadProductsFail(error)))
        )
      )
    )
  );

  loadProductsSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsSuccess),
      map((action) => updateProductsView({ pageNum: action.pageNum, pageSize: action.pageSize }))
    )
  );

  createProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      switchMap(({ product }) =>
        this.api.add(product).pipe(
          map((data) => createProductSuccess({ product: data })),
          catchError((error: HttpErrorResponse) => of(createProductFail({ error: error.message })))
        )
      )
    )
  );

  loadProductById$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductById),
      withLatestFrom(this.store.select(selectProducts)),
      switchMap(([{ id }, products]) => {
        const product = products.find((item) => item.id === id);
        if (product) {
          return of(loadProductByIdSuccess({ product }));
        } else {
          return this.api.getItem(id).pipe(
            map((data) => loadProductByIdSuccess({ product: data })),
            catchError((error: HttpErrorResponse) => of(loadProductByIdFail({ error: error.message })))
          );
        }
      })
    )
  );

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap(({ product }) =>
        this.api.update(product).pipe(
          map(() => updateProductSuccess({ product })),
          catchError((error: HttpErrorResponse) => of(updateProductFail({ error: error.message })))
        )
      )
    )
  );

  deleteProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap(({ product }) =>
        this.api.delete(product).pipe(
          map(() => deleteProductSuccess({ product })),
          catchError((error: HttpErrorResponse) => of(deleteProductFail({ error: error.message })))
        )
      )
    )
  );

  updateProductSuccess$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createProductSuccess, updateProductSuccess, deleteProductSuccess),
        withLatestFrom(this.store.select(selectProductsViewPageNum), this.store.select(selectProductsViewPageSize)),
        tap(([action, pageNum, pageSize]) => this.router.navigate(['list'], { queryParams: { pageNum, pageSize } })),
        switchMap(() => EMPTY)
      ),
    { dispatch: false }
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private api: ProductsService,
    private router: Router
  ) {}
}

import { createSelector } from '@ngrx/store';
import { AppState, ProductsState } from './products.reducer';

export const selectProductsState = (state: AppState) => state.products;

export const selectProducts = createSelector(selectProductsState, (state: ProductsState) => state.data);

export const selectProductsViewTable = () =>
  createSelector(selectProductsState, (state: ProductsState) => state.dataView);

export const selectProductById = (id: string) =>
  createSelector(selectProducts, (products) => products.find((item) => item.id.toString() === id));

export const selectProductsViewPageNum = createSelector(selectProductsState, (state: ProductsState) => state.pageNum);

export const selectProductsViewPageSize = createSelector(selectProductsState, (state: ProductsState) => state.pageSize);

export const selectProductsLoading = createSelector(selectProductsState, (state: ProductsState) => state.loading);

export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);

export const selectProductsAdding = createSelector(selectProductsState, (state: ProductsState) => state.adding);

export const selectProductsAddingError = createSelector(selectProductsState, (state: ProductsState) => state.error);

export const selectProductsDeleting = createSelector(selectProductsState, (state: ProductsState) => state.deleting);

export const selectProductsDeleteError = createSelector(selectProductsState, (state: ProductsState) => state.error);

export const selectProductsUpdating = createSelector(selectProductsState, (state: ProductsState) => state.updating);

export const selectProductsUpdateError = createSelector(selectProductsState, (state: ProductsState) => state.error);

export const selectUserRole = createSelector(selectProductsState, (state: ProductsState) => state.userRole);

import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Product, UserRoles } from '../models/models';

export enum ProductsActionTypes {
  LOAD = '[Products] Load Products',
  LOAD_SUCCESS = '[Products] Load Products Success',
  LOAD_FAIL = '[Products] Load Products Fail',

  SET_PRODUCT_VIEW_PARAMS = '[Products] Set Products View Params',
  FETCH_PRODUCT_VIEW = '[Products] Fetch Products View',
  UPDATE_PRODUCT_VIEW = '[Products] Update Products View',

  LOAD_PRODUCT_BY_ID = '[Products] Load Product By Id',
  LOAD_PRODUCT_BY_ID_SUCCESS = '[Products] Load Product By Id Success',
  LOAD_PRODUCT_BY_ID_FAIL = '[Products] Load Product By Id Fail',
  CREATE_PRODUCT = '[Products] Create Product',
  CREATE_PRODUCT_SUCCESS = '[Products] Create Product Success',
  CREATE_PRODUCT_FAIL = '[Products] Create Product Fail',
  DELETE_PRODUCT = '[Products] Delete Product',
  DELETE_PRODUCT_SUCCESS = '[Products] Delete Product Success',
  DELETE_PRODUCT_FAIL = '[Products] Delete Product Fail',
  UPDATE_PRODUCT = '[Products] Update Product',
  UPDATE_PRODUCT_SUCCESS = '[Products] Update Product Success',
  UPDATE_PRODUCT_FAIL = '[Products] Update Product Fail',

  SET_USER_ROLE = '[Products] Set User Role',
}

export const setProductsViewParams = createAction(
  ProductsActionTypes.SET_PRODUCT_VIEW_PARAMS,
  props<{ pageNum: number; pageSize: number }>()
);

export const fetchProductsView = createAction(
  ProductsActionTypes.FETCH_PRODUCT_VIEW,
  props<{ pageNum: number; pageSize: number }>()
);

export const updateProductsView = createAction(
  ProductsActionTypes.UPDATE_PRODUCT_VIEW,
  props<{ pageNum: number; pageSize: number }>()
);

export const loadProducts = createAction(ProductsActionTypes.LOAD, props<{ pageNum: number; pageSize: number }>());
export const loadProductsSuccess = createAction(
  ProductsActionTypes.LOAD_SUCCESS,
  props<{ pageNum: number; pageSize: number; data: Product[] }>()
);
export const loadProductsFail = createAction(ProductsActionTypes.LOAD_FAIL, props<{ error: string }>());

export const loadProductById = createAction(ProductsActionTypes.LOAD_PRODUCT_BY_ID, props<{ id: string }>());
export const loadProductByIdSuccess = createAction(
  ProductsActionTypes.LOAD_PRODUCT_BY_ID_SUCCESS,
  props<{ product: Product }>()
);
export const loadProductByIdFail = createAction(
  ProductsActionTypes.LOAD_PRODUCT_BY_ID_FAIL,
  props<{ error: string }>()
);

export const createProduct = createAction(ProductsActionTypes.CREATE_PRODUCT, props<{ product: Product }>());
export const createProductSuccess = createAction(
  ProductsActionTypes.CREATE_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);
export const createProductFail = createAction(ProductsActionTypes.CREATE_PRODUCT_FAIL, props<{ error: string }>());

export const deleteProduct = createAction(ProductsActionTypes.DELETE_PRODUCT, props<{ product: Product }>());
export const deleteProductSuccess = createAction(
  ProductsActionTypes.DELETE_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);
export const deleteProductFail = createAction(ProductsActionTypes.DELETE_PRODUCT_FAIL, props<{ error: string }>());

export const updateProduct = createAction(ProductsActionTypes.UPDATE_PRODUCT, props<{ product: Product }>());
export const updateProductSuccess = createAction(
  ProductsActionTypes.UPDATE_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);
export const updateProductFail = createAction(ProductsActionTypes.UPDATE_PRODUCT_FAIL, props<{ error: string }>());

export const setUserRole = createAction(ProductsActionTypes.SET_USER_ROLE, props<{ role: UserRoles }>());

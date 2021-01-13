import { Action, createReducer, on } from '@ngrx/store';
import { Product, UserRoles } from '../models/models';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFail,
  createProduct,
  createProductFail,
  createProductSuccess,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFail,
  updateProduct,
  updateProductSuccess,
  updateProductFail,
  loadProductByIdSuccess,
  loadProductByIdFail,
  loadProductById,
  updateProductsView,
  setProductsViewParams,
  setUserRole,
} from './products.actions';

export interface AppState {
  products: ProductsState;
}

export interface ProductsState {
  data: Product[];
  dataView: Product[];

  pageNum: number;
  pageSize: number;

  loading: boolean;
  adding: boolean;
  updating: boolean;
  deleting: boolean;

  error: string;
  userRole: UserRoles;
}

export const initialState: ProductsState = {
  data: [],
  dataView: [],
  loading: false,
  adding: false,
  updating: false,
  deleting: false,
  error: '',
  pageNum: 0,
  pageSize: 0,
  userRole: UserRoles.user,
};

const reducer = createReducer(
  initialState,
  on(loadProducts, (state: ProductsState) => ({
    ...state,
    loading: true,
  })),
  on(setProductsViewParams, (state: ProductsState, { pageNum, pageSize }) => ({
    ...state,
    pageNum,
    pageSize,
  })),
  on(loadProductsSuccess, (state: ProductsState, { pageNum, pageSize, data }) => {
    const startIndexData = (pageNum - 1) * pageSize;
    const dataNew = [...state.data];
    data.forEach((item, index) => (dataNew[startIndexData + index] = item));
    return {
      ...state,
      loading: false,
      error: '',
      data: dataNew,
    };
  }),

  on(updateProductsView, (state: ProductsState, { pageNum, pageSize }) => ({
    ...state,
    loading: false,
    error: '',
    dataView: state.data.slice(pageSize * (pageNum - 1), pageSize * (pageNum - 1) + pageSize),
  })),

  on(loadProductsFail, (state: ProductsState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(createProduct, (state: ProductsState) => ({
    ...state,
    adding: true,
  })),
  on(createProductSuccess, (state: ProductsState, { product }) => ({
    ...state,
    adding: false,
    error: '',
    data: [...state.data, product],
  })),
  on(createProductFail, (state: ProductsState, { error }) => ({
    ...state,
    adding: false,
    error,
  })),

  on(loadProductById, (state: ProductsState) => ({
    ...state,
    loading: true,
  })),
  on(loadProductByIdSuccess, (state: ProductsState, { product }) => ({
    ...state,
    loading: false,
    error: '',
    data: state.data.find((item) => item.id === product.id) ? [...state.data] : [...state.data, product],
  })),

  on(loadProductByIdFail, (state: ProductsState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(updateProduct, (state: ProductsState) => ({
    ...state,
    updating: true,
  })),
  on(updateProductSuccess, (state: ProductsState, { product }) => ({
    ...state,
    updating: false,
    error: '',
    data: state.data.map((item) => (item.id === product.id ? product : item)),
  })),

  on(updateProductFail, (state: ProductsState, { error }) => ({
    ...state,
    updating: false,
    error,
  })),

  on(deleteProduct, (state: ProductsState) => ({
    ...state,
    deleting: true,
  })),
  on(deleteProductSuccess, (state: ProductsState, { product }) => ({
    ...state,
    deleting: false,
    error: '',
    data: state.data.filter((item) => item.id !== product.id),
  })),
  on(deleteProductFail, (state: ProductsState, { error }) => ({
    ...state,
    deleting: false,
    error,
  })),
  on(setUserRole, (state: ProductsState, { role }) => ({
    ...state,
    userRole: role,
  }))
);

export const productsReducer = (state: ProductsState | undefined, action: Action) => reducer(state, action);

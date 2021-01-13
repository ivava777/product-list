export interface Product {
  id: string;
  name: string;
  price: number;
}

export enum PageSizes {
  'size5' = '5',
  'size10' = '10',
  'size15' = '15',
  'size50' = '50',
}

export enum UserRoles {
  'user' = 'user',
  'admin' = 'admin',
  'owner' = 'owner',
}

export const initListPage = {
  pageNum: 1,
  pageSize: 5,
};

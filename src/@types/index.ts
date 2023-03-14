export type ApiResponse<T = undefined> = {
  message: string;
  data: T;
};

export type Status = 'WAITING' | 'IN_PRODUCTION' | 'DONE';

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: Category;
};

export type Waiter = {
  id: string;
  name: string;
  username: string;
  password: string;
};

export type Order = {
  id: string;
  table: number;
  status: Status;
  createdAt: string;
  products: Product[];
  waiter: Waiter;
  customerName: string;
};

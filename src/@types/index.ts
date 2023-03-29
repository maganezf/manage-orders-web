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

export type CreateCategory = Omit<Category, 'id'>;

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: Category;
};

export type CreateProduct = Omit<Product, 'id'>;

export type Waiter = {
  id: string;
  username: string;
  password: string;
};

export type SignInWaiter = Omit<Waiter, 'id'>;

export type Order = {
  id: string;
  table: number;
  status: Status;
  createdAt: string;
  products: Product[];
  customerName: string;
};

export type CreateOrder = Omit<Order, 'id' | 'waiter'>;

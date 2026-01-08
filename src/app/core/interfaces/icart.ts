export interface Product {
  _id: string;
  productName: string;
  productDesc: string;
  price: number;
  discountPrice: number;
  stock: number;
  images: string[];
  category: string;
  subCategory: string;
  isActivated: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
  _id: string;
}

export interface ICart {
  _id: string;
  user: string;
  items: CartItem[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProduct {
  _id: string;
  productName: string;
  productDesc: string;
  price: number;
  discountPrice: number;
  stock: number;
  images: string[];
  category: { name: string };
  subCategory: string;
  isActivated: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}

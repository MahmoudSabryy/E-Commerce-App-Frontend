export interface ICategory {
  _id: string;
  name: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  image: string;
  isActive: boolean;
}

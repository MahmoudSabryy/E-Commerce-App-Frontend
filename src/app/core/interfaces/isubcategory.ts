export interface ISubcategory {
  _id: string;
  name: string;
  category: {
    name: string;
  };
  slug: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

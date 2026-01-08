export interface IAddress {
  governorate?: string;
  city?: string;
  addressDetails?: string;
  isDefault?: boolean;
}

export interface IAddresses {
  homeAddress?: IAddress;
  workAddress?: IAddress;
}

export enum GenderTypes {
  male = 'male',
  female = 'female',
}

export enum RoleTypes {
  admin = 'admin',
  user = 'user',
}

export interface IUser {
  _id?: string;
  userName: string;
  email: string;
  password: string;

  gender?: GenderTypes;

  confirmEmail?: boolean;

  role?: RoleTypes;

  phone?: string;
  age?: number;
  DOB?: Date;

  changedAt?: Date;

  addresses?: IAddresses;

  isBlocked?: boolean;

  forgetPasswordOtp?: string;
  confirmEmailOtp?: string;

  changecredentials?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

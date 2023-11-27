// import { Model } from 'mongoose';

import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  // middleName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

// export type TOrders = {
//   street: string;
//   city: string;
//   country: string;
// };
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[] | [];
  // orders: {
  //   productName: string;
  //   price: number;
  //   quantity: number;
  // }[];
};
export type TUpdateUser = {
  userId?: number;
  username?: string;
  password?: string;
  fullName?: {
    firstName?: string;
    lastName?: string;
  };
  age?: number;
  email?: string;
  isActive?: boolean;
  hobbies?: string[];
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
  // orders: {
  //   productName: string;
  //   price: number;
  //   quantity: number;
  // }[];
};

//for creating static

export interface UserModel extends Model<TUser> {
  doesUserExist(id: number): Promise<TUser | null>;
}

// for creating instance

// export interface UserMethods {
//   doesUserExist(id: number): Promise<TUser | null>;
// }

// export interface UserMethods {
//   doesUserExist(id: number): Promise<TUser | null>;
// }

// export type UserModel = Model<TUser, Record<string, never>, UserMethods>;

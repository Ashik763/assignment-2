import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';

import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user.interface';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});
const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'street is required'],
    trim: true,
    maxlength: [40, 'Name can not be more than 20 characters'],
  },
  city: {
    type: String,
    required: [true, 'street is required'],
    trim: true,
    maxlength: [40, 'Name can not be more than 20 characters'],
  },
  country: {
    type: String,
    required: [true, 'street is required'],
    trim: true,
    maxlength: [40, 'Name can not be more than 20 characters'],
  },
});
const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'product name is required'],
    trim: true,
    maxlength: [40, 'Name can not be more than 20 characters'],
  },
  price: {
    type: Number,
    required: [true, 'street is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
    trim: true,
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [200, 'Password can not be more than 20 characters'],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies is required'],
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
  },
  orders: [orderSchema],
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.doesUserExist = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });

  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);

import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';

import {
  TAddress,
  TFullName,
  TOrder,
  // TUpdateUser,
  TUser,
  // UserMethods,
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

const userSchema = new Schema<TUser, UserModel>(
  {
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
  },

  //   {
  //     toJSON: {
  //       virtuals: true,
  //     },
  //   },
);
// export const userUpdateSchema = new Schema<TUpdateUser>(
//   {
//     userId: {
//       type: Number,
//       required: false,
//       unique: true,
//     },
//     username: {
//       type: String,
//       required: false,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: false,
//       maxlength: [200, 'Password can not be more than 20 characters'],
//     },
//     fullName: {
//       type: fullNameSchema,
//       required: false,
//     },
//     age: {
//       type: Number,
//       required: false,
//     },
//     email: {
//       type: String,
//       required: false,
//       unique: true,
//     },
//     isActive: {
//       type: Boolean,
//       default: false,
//     },
//     hobbies: {
//       type: [String],
//       required: false,
//     },
//     address: {
//       street: {
//         type: String,
//         required: false,
//         trim: true,
//         maxlength: [40, 'Name can not be more than 20 characters'],
//       },
//       city: {
//         type: String,
//         required: false,
//         trim: true,
//         maxlength: [40, 'Name can not be more than 20 characters'],
//       },
//       country: {
//         type: String,
//         required: false,
//         trim: true,
//         maxlength: [40, 'Name can not be more than 20 characters'],
//       },
//       required: false,
//     },
//   },

//   {
//     toJSON: {
//       virtuals: true,
//     },
//   },
// );

// virtual
// studentSchema.virtual('fullName').get(function () {
//   return this.name.firstName + this.name.middleName + this.name.lastName;
// });

// pre save middleware/ hook : will work on create()  save()
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save  data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// // post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Query Middleware
// userSchema.pre('find', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// userSchema.pre('findOne', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// [ {$match: { isDeleted : {  $ne: : true}}}   ,{ '$match': { id: '123456' } } ]

// userSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

// creating a custom static method
userSchema.statics.doesUserExist = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });
  console.log(existingUser);

  return existingUser;
};

// creating a custom instance method
// userSchema.methods.doesUserExist = async function (id: number) {
//   const existingUser = await User.findOne({ id });

//   return existingUser;
// };

// userSchema.methods.doesUserExist = async function (id: number) {
//   const existingUser = await User.findOne({ id });

//   return existingUser;
// };

export const User = model<TUser, UserModel>('User', userSchema);

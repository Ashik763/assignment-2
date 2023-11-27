// import { TStudent } from './student.interface';
// import { Student } from './student.model';

import { TOrder, TUpdateUser, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  // if (await User.isUserExists(userData.id)) {
  //   throw new Error('User already exists!');
  // }
  // console.log(userData);
  const result = await User.create(userData);

  return result;
};
const getUserFromDB = async () => {
  const result = await User.find()
    .select({ userId: 0, isActive: 0, hobbies: 0, 'address._id': 0, orders: 0 })
    .select('-password')
    .select({ __v: 0 })
    .select({ _id: 0 })
    .select({ 'fullName._id': 0 });

  return result;
};

const getASpecificUserFromDb = async (userId: number) => {
  if (await User.doesUserExist(userId)) {
    const result = await User.findOne({ userId: userId })
      .select({ 'address._id': 0, orders: 0 })
      .select('-password')
      .select({ __v: 0 })
      .select({ _id: 0 })
      .select({ 'fullName._id': 0 });
    return result;
  } else {
    throw new Error('User not found!');
  }
};

const updateASpecificUserFromDb = async (userId: number, data: TUpdateUser) => {
  try {
    if (await User.doesUserExist(userId)) {
      const user = await User.findOne({ userId: userId });

      if (user) {
        if (data.userId) {
          user.userId = data.userId;
        }
        if (data.username) {
          user.username = data.username;
        }
        if (data.password) {
          user.password = data.password;
        }
        if (data.fullName?.firstName) {
          user.fullName.firstName = data.fullName?.firstName;
        }
        if (data.fullName?.lastName) {
          user.fullName.lastName = data.fullName?.lastName;
        }

        if (data.age) {
          user.age = data.age;
        }

        if (data.email) {
          user.email = data.email;
        }
        if (data.isActive === true || data.isActive === false) {
          user.isActive = data.isActive;
        }
        if (data.hobbies) {
          user.hobbies = data.hobbies;
        }
        if (data?.address?.street) {
          user.address.street = data.address.street;
        }
        if (data?.address?.city) {
          user.address.city = data.address.city;
        }
        if (data?.address?.country) {
          user.address.country = data.address.country;
        }

        const updated = await user.save();
        const {
          userId,
          username,
          fullName,
          age,
          email,
          isActive,
          hobbies,
          address,
        } = updated;

        return {
          userId,
          username,
          fullName,
          age,
          email,
          isActive,
          hobbies,
          address,
        };
      } else {
        throw new Error('User not found!');
      }
    } else {
      throw new Error(
        'User exists! But you need to put unique value to some fields',
      );
    }
  } catch (err) {
    throw new Error('User not found!');
  }
};

const deleteASpecificUserFromDb = async (userId: number) => {
  if (await User.doesUserExist(userId)) {
    const result = await User.deleteOne({ userId: userId });

    return result;
  } else {
    throw new Error('User not found!');
  }
};

const addNewProductToOrders = async (userId: number, data: TOrder) => {
  try {
    if (await User.doesUserExist(userId)) {
      // await User.updateOne({ userId: userId }, { $push: { orders: data } });

      const result = await User.findOneAndUpdate(
        { userId: userId },
        { $push: { orders: data } },
      );

      return result;
    } else {
      throw new Error('User not found!');
    }
  } catch (err) {
    throw new Error('User not found!');
  }
};

const getUserOrdersFromDb = async (userId: number) => {
  if (await User.doesUserExist(userId)) {
    const result = await User.find({ userId: userId }).select({
      orders: 1,
      _id: 0,
    });
    return result;
  } else {
    throw new Error('User not found');
  }

  // .select('-password')
  // .select({ __v: 0 })
  // .select({ _id: 0 })
  // .select({ 'fullName._id': 0 });
};

const getTotalPriceFromDb = async (userId: number) => {
  if (await User.doesUserExist(userId)) {
    const result = User.aggregate([
      { $match: { userId: userId } },
      { $unwind: '$orders' },
      {
        $group: {
          _id: '$_id',
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
      {
        $project: { totalPrice: 1, _id: 0 },
      },
    ]);

    return result;
  } else {
    throw new Error('User not found');
  }
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  getASpecificUserFromDb,
  updateASpecificUserFromDb,
  deleteASpecificUserFromDb,
  addNewProductToOrders,
  getUserOrdersFromDb,
  getTotalPriceFromDb,
};

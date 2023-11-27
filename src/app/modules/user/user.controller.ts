/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
// import userValidationSchema from './user.validation';
import { UserServices } from './user.service';
import _ from 'lodash';
import { validation } from './user.validation';
// import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body);

  try {
    const userData = req.body;
    // console.log(userData);
    const zodParsedData = validation.userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);
    // const {userId,username,fullName,age,email,isActive,hobbies,address} = result;

    // const { password, __v, ...obj } = result;
    // console.log(obj);
    const re = _.omit(result, 'password');

    res.status(200).json({
      success: true,
      message: 'User is created succesfully',
      data: re,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  // console.log(req.body);

  try {
    const result = await UserServices.getUserFromDB();

    // const re = _.omit(result, 'password');

    res.status(200).json({
      success: true,
      message: 'User is created succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getASpecificUser = async (req: Request, res: Response) => {
  // console.log(req.body);

  try {
    const userId = req.params.userId;
    const result = await UserServices.getASpecificUserFromDb(Number(userId));

    // const re = _.omit(result, 'password');

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: err.message || 'User not found',
      },
    });
  }
};

const updateASpecificUser = async (req: Request, res: Response) => {
  try {
    const zodParsedData = validation.userUpdateValidationSchema.parse(req.body);
    const userId = req.params.userId;

    const result = await UserServices.updateASpecificUserFromDb(
      Number(userId),
      zodParsedData,
    );

    const data = {
      ...result,
      fullName: {
        firstName: result?.fullName.firstName,
        lastName: result?.fullName.lastName,
      },
      address: {
        street: result?.address?.street,
        city: result?.address?.city,
        country: result?.address?.country,
      },
    };
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: data,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: err.message || 'User not found',
      },
    });
  }
};

const deleteASpecificUser = async (req: Request, res: Response) => {
  // console.log(req.body);

  try {
    const userId = req.params.userId;
    await UserServices.deleteASpecificUserFromDb(Number(userId));

    // const re = _.omit(result, 'password');

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: err.message || 'User not found',
      },
    });
  }
};

const addNewProduct = async (req: Request, res: Response) => {
  try {
    const zodParsedData = validation.orderValidationSchema.parse(req.body);
    const userId = req.params.userId;

    await UserServices.addNewProductToOrders(Number(userId), zodParsedData);

    // const data = {
    //   ...result,
    //   fullName: {
    //     firstName: result?.fullName.firstName,
    //     lastName: result?.fullName.lastName,
    //   },
    //   address: {
    //     street: result?.address?.street,
    //     city: result?.address?.city,
    //     country: result?.address?.country,
    //   },
    // };
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        code: 404,
        description: err.message || 'User not found',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getASpecificUser,
  updateASpecificUser,
  deleteASpecificUser,
  addNewProduct,
};

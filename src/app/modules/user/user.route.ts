import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// create a new user route
router.post('/', UserControllers.createUser);

// get all the users info
router.get('/', UserControllers.getAllUsers);

// specific user info

router.get('/:userId', UserControllers.getASpecificUser);

// Update specific User info

router.put('/:userId', UserControllers.updateASpecificUser);

// deleting a user

router.delete('/:userId', UserControllers.deleteASpecificUser);

//add product to order array

router.put('/:userId/orders', UserControllers.addNewProduct);

// orders of an user

router.get('/:userId/orders', UserControllers.getUserOrders);

// total price of a user ordered product

router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);

export const UserRoutes = router;

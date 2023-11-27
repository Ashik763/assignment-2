import express from 'express';
import { UserControllers } from './user.controller';
// import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getASpecificUser);

router.put('/:userId', UserControllers.updateASpecificUser);

router.delete('/:userId', UserControllers.deleteASpecificUser);

router.put('/:userId/orders', UserControllers.addNewProduct);

router.get('/:userId/orders', UserControllers.getUserOrders);

router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);

export const UserRoutes = router;

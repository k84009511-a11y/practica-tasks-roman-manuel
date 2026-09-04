import { Router } from "express";
import { 
    createUser, 
    deleteUser, 
    getUserById, 
    getUser,  
    updateUser
} from "../controller/user.controller.js";
import { 
    validateCreateUser, 
    validateUserId,
    validateUpdateUser
} from "../middlewares/validations/user.validations.js";
import { validate } from "../middlewares/validate.js";

export const userRouter = Router();

userRouter.post('/users', validateCreateUser, validate, createUser);
userRouter.get('/users', getUser);
userRouter.get('/users/:id', validateUserId, validate, getUserById);
userRouter.delete('/users/:id', validateUserId, validate, deleteUser);
userRouter.put('/users/:id', validateUserId, validateUpdateUser ,validate, updateUser);
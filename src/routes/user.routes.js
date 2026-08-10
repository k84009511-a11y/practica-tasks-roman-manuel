import { Router } from "express";
import { 
    createUser, 
    deleteUser, 
    getUserById, 
    getUser,  
    updateUser
} from "../controller/user.controller.js";


export const userRouter = Router();

userRouter.post('/users', createUser)
userRouter.get ('/users', getUser)
userRouter.get ('/users/:id', getUserById)
userRouter.delete ('/users/:id', deleteUser)
userRouter.put('/users/:id', updateUser)

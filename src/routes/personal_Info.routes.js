import { Router } from "express";
import { 
    createPersonalInfo, 
    deletePersonalInfo, 
    getPersonalInfo, 
    getPersonalInfoById,  
    updatePersonalInfo
} from "../controller/personal_Info.controller.js";


export const personalInfoRouter = Router();

personalInfoRouter.post('/personalInfos', createPersonalInfo )
personalInfoRouter.get ('/personalInfos', getPersonalInfo )
personalInfoRouter.get ('/personalInfos/:id', getPersonalInfoById)
personalInfoRouter.delete ('/personalInfos/:id', deletePersonalInfo )
personalInfoRouter.put('/personalInfos/:id', updatePersonalInfo )

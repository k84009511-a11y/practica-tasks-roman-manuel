import { Router } from "express";
import { 
    createPersonalInfo, 
    deletePersonalInfo, 
    getPersonalInfo, 
    getPersonalInfoById, 
    updatePersonalInfo 
} from "../controller/personal_Info.controller.js";
import { 
    validateCreatePersonalInfo, 
    validatePersonalInfoId 
} from "../middlewares/validations/personalInfo.validations.js";
import { validate } from "../middlewares/validate.js";

export const personalInfoRouter = Router();

personalInfoRouter.post('/personalInfos', validateCreatePersonalInfo, validate, createPersonalInfo);
personalInfoRouter.get('/personalInfos', getPersonalInfo);
personalInfoRouter.get('/personalInfos/:id', validatePersonalInfoId, validate, getPersonalInfoById);
personalInfoRouter.delete('/personalInfos/:id', validatePersonalInfoId, validate, deletePersonalInfo);
personalInfoRouter.put('/personalInfos/:id', validatePersonalInfoId, validate, updatePersonalInfo);
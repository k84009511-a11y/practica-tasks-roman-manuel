import { Router } from "express";
import {
    createTask,
    getTasks,
    getTasksById,
    deleteTask,
    updateTask
} from '../controller/task.controller.js';
import { 
    validateCreateTask, 
    validateTaskId, 
    validateUpdateTask
} from "../middlewares/validations/task.validations.js";
import { validate } from "../middlewares/validate.js";

export const taskRouter = Router();

taskRouter.post('/tasks', validateCreateTask, validate, createTask);
taskRouter.get('/tasks', getTasks);
taskRouter.get('/tasks/:id', validateTaskId, validate, getTasksById);
taskRouter.delete('/tasks/:id', validateTaskId, validate, deleteTask);
taskRouter.put('/tasks/:id', validateTaskId, validateUpdateTask, validate, updateTask);
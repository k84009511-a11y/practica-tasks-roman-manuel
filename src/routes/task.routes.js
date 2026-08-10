import { Router } from "express";
import{
    createTask,
    getTasks,
    getTasksById,
    deleteTask,
    updateTask
} from '../controller/task.controller.js'

export const taskRouter = Router();

taskRouter.post ('/tasks', createTask)
taskRouter.get ('/tasks', getTasks)
taskRouter.get ('/tasks/:id', getTasksById)
taskRouter.delete ('/tasks/:id', deleteTask)
taskRouter.put('/tasks/:id', updateTask)

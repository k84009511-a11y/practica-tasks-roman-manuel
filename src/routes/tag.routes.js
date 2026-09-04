import { Router } from "express";
import { 
    createTag, 
    deleteTag, 
    getTags, 
    getTagsById, 
    addTagToTask, 
    getTagsByTask 
} from "../controller/tag.controller.js";
import { 
    validateCreateTag, 
    validateTagId, 
    validateAddTagToTask 
} from "../middlewares/validations/tag.validations.js";
import { validateTaskId } from "../middlewares/validations/task.validations.js";
import { validate } from "../middlewares/validate.js";

export const tagRouter = Router();

tagRouter.get('/tags', getTags);
tagRouter.get('/tags/:id', validateTagId, validate, getTagsById);
tagRouter.post('/tags', validateCreateTag, validate, createTag);
tagRouter.delete('/tags/:id', validateTagId, validate, deleteTag);

tagRouter.post('/tasks/:taskId/tags/:tagId', validateAddTagToTask, validate, addTagToTask);
tagRouter.get('/tasks/:taskId/tags', validateTaskId, validate, getTagsByTask);
tagRouter.put('/tags/:id', validateTagId, validateUpdateTag, validate, updateTag);
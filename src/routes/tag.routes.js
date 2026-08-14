import { Router } from "express";
import {
  createTag,
  getTags,
  getTagsById,
  deleteTag,
  addTagToTask,
  getTagsByTask
} from "../controller/tag.controller.js";

export const tagRouter = Router();


tagRouter.get('/tags', getTags);
tagRouter.get('/tags/:id', getTagsById);
tagRouter.post('/tags', createTag);
tagRouter.delete('/tags/:id', deleteTag);


tagRouter.post('/tasks/:id/tags/:id', addTagToTask);
tagRouter.get('/tasks/:id/tags', getTagsByTask);

import { body, param } from 'express-validator';
import { Tag } from '../../models/tag.model.js';
import { Task } from '../../models/task.model.js';

export const validateTagId = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID de la etiqueta debe ser un entero positivo')
        .custom(async (id) => {
            const tag = await Tag.findByPk(id);
            if (!tag) {
                throw new Error('La etiqueta no existe');
            }
        })
];

export const validateCreateTag = [
    body('name')
        .notEmpty().withMessage('El nombre de la etiqueta es obligatorio')
        .custom(async (name) => {
            const tag = await Tag.findOne({ where: { name } });
            if (tag) {
                throw new Error('La etiqueta ya existe');
            }
        })
];

export const validateAddTagToTask = [
    param('taskId')
        .isInt({ min: 1 }).withMessage('El ID de la tarea debe ser un entero positivo')
        .custom(async (taskId) => {
            const task = await Task.findByPk(taskId);
            if (!task) {
                throw new Error('La tarea especificada no existe');
            }
        }),
    param('tagId')
        .isInt({ min: 1 }).withMessage('El ID de la etiqueta debe ser un entero positivo')
        .custom(async (tagId) => {
            const tag = await Tag.findByPk(tagId);
            if (!tag) {
                throw new Error('La etiqueta especificada no existe');
            }
        })
];

export const validateUpdateTag = [
    body('name')
        .optional()
        .notEmpty().withMessage('El nombre de la etiqueta no puede estar vacío')
        .custom(async (name) => {
            const tag = await Tag.findOne({ where: { name } });
            if (tag) {
                throw new Error('La etiqueta ya existe');
            }
        })
];
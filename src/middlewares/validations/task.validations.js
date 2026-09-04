import { body, param } from 'express-validator';
import { Task } from '../../models/task.model.js';
import { User } from '../../models/user.model.js';

export const validateTaskId = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID de la tarea debe ser un número entero positivo')
        .custom(async (id) => {
            const task = await Task.findByPk(id);
            if (!task) {
                throw new Error('La tarea no existe');
            }
        })
];

export const validateCreateTask = [
    body('title')
        .notEmpty().withMessage('El título es obligatorio')
        .isLength({ max: 100 }).withMessage('El título no puede superar los 100 caracteres')
        .custom(async (title) => {
            const task = await Task.findOne({ where: { title } });
            if (task) {
                throw new Error('Ya existe una tarea con este título');
            }
        }),
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria'),
    body('users_id')
        .notEmpty().withMessage('El ID de usuario es obligatorio')
        .isInt({ min: 1 }).withMessage('El ID de usuario debe ser un entero positivo')
        .custom(async (users_id) => {
            const user = await User.findByPk(users_id);
            if (!user) {
                throw new Error('El usuario asignado a la tarea no existe');
            }
        })
];
export const validateUpdateTask = [
    body('title')
    .optional()
    .isLength({max: 100}).withMessage('El título no puede superar los 100 caracteres')
    .custom(async (title) => {
        const task = await Task.findOne({where: {title}});
        if (task) {
            throw new Error('Ya existe una tarea con este título')
        }
    }), 

    body('description')
    .optional()
    .notEmpty().withMessage('La descripción no puede estar vacía'),

    body('isComplete')
    .optional()
    .isBoolean().withMessage()
]
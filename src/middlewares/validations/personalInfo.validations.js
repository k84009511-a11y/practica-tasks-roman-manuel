import { body, param } from 'express-validator';
import { PersonalInfo } from '../../models/personal_Info.model.js';
import { User } from '../../models/user.model.js';

export const validatePersonalInfoId = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un entero positivo')
        .custom(async (id) => {
            const info = await PersonalInfo.findByPk(id);
            if (!info) {
                throw new Error('La información personal no existe');
            }
        })
];

export const validateCreatePersonalInfo = [
    body('dni')
        .notEmpty().withMessage('El DNI es obligatorio')
        .isLength({ max: 15 }).withMessage('El DNI no puede exceder los 15 caracteres')
        .custom(async (dni) => {
            const info = await PersonalInfo.findOne({ where: { dni } });
            if (info) {
                throw new Error('El DNI ya se encuentra registrado');
            }
        }),
    body('cuil')
        .notEmpty().withMessage('El CUIL es obligatorio')
        .isLength({ max: 15 }).withMessage('El CUIL no puede exceder los 15 caracteres')
        .custom(async (cuil) => {
            const info = await PersonalInfo.findOne({ where: { cuil } });
            if (info) {
                throw new Error('El CUIL ya se encuentra registrado');
            }
        }),
    body('users_id')
        .notEmpty().withMessage('El ID de usuario es obligatorio')
        .isInt({ min: 1 }).withMessage('El ID de usuario debe ser un entero positivo')
        .custom(async (users_id) => {
            const user = await User.findByPk(users_id);
            if (!user) {
                throw new Error('El usuario especificado no existe');
            }
            const existingInfo = await PersonalInfo.findOne({ where: { users_id } });
            if (existingInfo) {
                throw new Error('Este usuario ya posee información personal asociada');
            }
        })
];

export const validateUpdatePersonalInfo = [
    body('dni')
        .optional()
        .isLength({ max: 15 }).withMessage('El DNI no puede exceder los 15 caracteres')
        .custom(async (dni) => {
            const info = await PersonalInfo.findOne({ where: { dni } });
            if (info) {
                throw new Error('El DNI ya se encuentra registrado');
            }
        }),
    body('cuil')
        .optional()
        .isLength({ max: 15 }).withMessage('El CUIL no puede exceder los 15 caracteres')
        .custom(async (cuil) => {
            const info = await PersonalInfo.findOne({ where: { cuil } });
            if (info) {
                throw new Error('El CUIL ya se encuentra registrado');
            }
        }),
    body('birthDate')
        .optional()
        .isISO8601().withMessage('La fecha de nacimiento debe tener formato válido (YYYY-MM-DD)'),
    body('gender')
        .optional()
        .isLength({ max: 20 }).withMessage('El género no puede exceder los 20 caracteres'),
    body('height')
        .optional()
        .isFloat({ min: 0 }).withMessage('La altura debe ser un número válido'),
    body('weight')
        .optional()
        .isFloat({ min: 0 }).withMessage('El peso debe ser un número válido')
];
import { body, param } from 'express-validator';
import { User } from '../../models/user.model.js';


export const validateUserId = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
    .custom(async (id) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('El usuario no existe');
      }
    })
];

export const validateCreateUser = [
  body('name')
    .notEmpty().withMessage('Debes colocar un nombre')
    .isLength({ min: 2 }).withMessage('Tu nombre no puede contener menos de 2 caracteres'),
  
  body('email')
    .notEmpty().withMessage('El correo es necesario')
    .isEmail().withMessage('El correo electrónico debe ser válido')
    .custom(async (email) => { 
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error('El correo electrónico ya está registrado');
      }
    }),

  body('password')
    .notEmpty().withMessage('La contraseña es necesaria')
    .isLength({ min: 8 }).withMessage('La contraseña no puede contener menos de 8 caracteres')
];
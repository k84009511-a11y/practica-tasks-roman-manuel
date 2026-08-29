import { matchedData } from 'express-validator';
import { PersonalInfo } from '../models/personal_Info.model.js';
import { Task } from '../models/task.model.js';
import { User } from '../models/user.model.js';


export const createUser = async (req, res) => {
  try {

    const validatedData = matchedData(req);

    const newUser = await User.create(validatedData);

    return res.status(201).json(newUser);
    }catch(error){
        return res.status(500).json({ 
            message: "Error al crear el usuario", 
            error: error.message });
  }
};

export const getUser = async (req, res) => {
    try{
        const users = await User.findAll({
            include: {
                model: Task,
                as: "tareas",
                attributes: ["id", "title", "description", "isComplete"]
            },
            attributes: { exclude: "password"},
            include: {
                model: PersonalInfo,
                as: "InfoPersonal",
                attributes: ["id", "dni", "cuil", "birthDate", "gender", "height", "weight"],
                exclude: ['createdAt', 'updatedAt', 'users_id']
            }
        });

        return res.status(200).json(users)
    } catch (error){
        return res.status(500).json({ 
            message: "Error en el servidor",
            error: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userFind = await User.findByPk(id,
            {
                attributes: { exclude: ["password"]},
            include: [{
                model: Task,
                as: "tareas",
            },
            {
                model: PersonalInfo,
                as: "InfoPersonal",
                attributes: ["id", "dni", "cuil", "birthDate", "gender", "height", "weight"],
                exclude: ['createdAt', 'updatedAt', 'users_id']
            }]
        });

        if (!userFind){
            return res.status(404).json ({ 
                message: "Usuario no encontrado"})
        }

        return res.status(200).json(userFind)
    }catch(error){
        return res.status(500).json ({ 
            message: "Error al buscar el usuario",
            error: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const userDell = await User.destroy({ where: { id } })

        if(!userDell){
            return res.status(404).json ({
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({ message: "Usuario eliminado correctamente"})
    }catch(error){
        return res.status(500).json ({
            message: "Error al tratar de eliminar el usuario",
            error: error.message
        })
    }
}
export const updateUser = async () => {
    try{
        const { id } = req.params;

        const user = await User.findByPk(id)
        if(!user) {
            return res.status(404).json( { message: "Usuario encontrado"});
        }

        await user.update(req.body);

        return res.status(200).json(user)
    }catch(error){
        return res.status(500).json( { message: "Error al actualizar el usuario", error: error.message })
    }
}
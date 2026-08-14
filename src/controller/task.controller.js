import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const createTask = async (req, res) =>{
    try{
        const { title, description, isComplete, users_id} = req.body;

        if(!title||!description ||!users_id){
            return res.status(400).json({ message: "Todos los campos son obligatorios"})
        }
    const newTask = await Task.create({title,description,isComplete, users_id})
    
    return res.status(201).json(newTask)
    }catch(error){
        return res.status(500).json({ 
            message: "Error al crear la tarea", 
            error: error.message });  
    }

    const userExists = await User.findByPk(users_id);
        if (!userExists) {
            return res.status(404).json({ message: "El usuario especificado no existe" });
    }

} 

export const getTasks = async (req, res) => {
    try{
        const tasks = await Task.findAll({
            include: {
                model: User,
                as: "autor",
                attributes: ["id", "name", "email"],
                exclude: ['createdAt', 'updatedAt', 'users_id']
            }
        });

        return res.status(200).json(tasks)
    } catch (error){
        return res.status(500).json({ 
            message: "Error en el servidor",
            error: error.message })
    }
}

export const getTasksById = async (req, res) => {
    try {
        const { id } = req.params;
        const taskFind = await Task.findByPk(id, {
            include: {
                model: User,
                as: "autor",
                attributes: ["id", "name", "email"],
                exclude: ['createdAt', 'updatedAt', 'users_id']
            }
        });

        if (!taskFind){
            return res.status(404).json ({ 
                message: "Tarea no encontrada"})
        }

        return res.status(200).json(taskFind)
    }catch(error){
        return res.status(500).json ({ 
            message: "Error al buscar la tarea",
            error: error.message
        })
    }
}

export const deleteTask = async (req, res) => {
    try{
        const { id } = req.params;
        const taskDell = await Task.destroy({ where: { id } })

        if(!taskDell){
            return res.status(404).json ({
                message: "Tarea no encontrada"
            })
        }

        return res.status(200).json({ message: "Tarea eliminada correctamente"})
    }catch(error){
        return res.status(500).json ({
            message: "Error al tratar de eliminar la tarea",
            error: error.message
        })
    }
}
export const updateTask = async (req, res) => {
    try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if(!task){
        return res.status(404).json({ message: "Tarea no encontrada"})
    }

    await task.update(req.body)

    return res.status(200).json(task)

    }catch(error){
        return res.status(500).json({message: "Error al actualizar la tarea", error: error.message})
    }
}
import { Task } from "../models/task.model.js";

export const createTask = async (req, res) =>{
    try{
        const { tittle, description, isComplete} = req.body;

        if(!tittle||!description ||!isComplete){
            return res.status(400).json({ message: "Todos los campos son obligatorios"})
        }
    const newTask = await Task.create({tittle,description,isComplete})
    
    return res.status(200).json(newTask)
    }catch(error){
        return res.status(500).json({ 
            message: "Error al crear la tarea", 
            error: error.message });  
    }
} 

export const getTasks = async (req, res) => {
    try{
        const tasks = await Task.findAll();
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
        const taskFind = await Task.findByPk(id);

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


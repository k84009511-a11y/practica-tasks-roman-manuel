import { PersonalInfo } from "../models/personal_Info.model.js";
import { User } from "../models/user.model.js";


export const createPersonalInfo = async (req, res) => {
  try {
    const { dni, cuil, birthDate, gender, height, weight, users_id } = req.body;

        if (!dni || !cuil || !birthDate || !gender || !height || !weight || !users_id) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

const newPersonalInfo = await PersonalInfo.create({ dni, cuil, birthDate, gender, height, weight, users_id });

    return res.status(201).json(newPersonalInfo);
    }catch(error){
        return res.status(500).json({ 
            message: "Error al cargar la información del usuario", 
            error: error.message });
  }
  const userExists = await User.findByPk(users_id);
        if (!userExists) {
            return res.status(404).json({ message: "El usuario especificado no existe" });
    }
};

export const getPersonalInfo = async (req, res) => {
    try{
        const infos = await PersonalInfo.findAll({
            include: {
                model: User,
                as: "Usuario",
                attributes: ["id", "name", "email"]
            },
            attributes: { exclude: "password"}
        });

        return res.status(200).json(users)
    } catch (error){
        return res.status(500).json({ 
            message: "Error en el servidor",
            error: error.message })
    }
}

export const getPersonalInfoById = async (req, res) => {
    try {
        const { id } = req.params;
        const infoFind = await PersonalInfo.findByPk(id,
            {
            include: {
                model: User,
                as: "Usuario",
            },
                attributes: { exclude: ["password"]}
        });

        if (!infoFind){
            return res.status(404).json ({ 
                message: "Información del usuario no encontrada"})
        }

        return res.status(200).json(infoFind)
    }catch(error){
        return res.status(500).json ({ 
            message: "Error al buscar la informacion solicitada",
            error: error.message
        })
    }
}

export const deletePersonalInfo = async (req, res) => {
    try{
        const { id } = req.params;
        const infoDell = await PersonalInfo.destroy({ where: { id } })

        if(!infoDell){
            return res.status(404).json ({
                message: "informacion no encontrada"
            })
        }

        return res.status(200).json({ message: "La informacion del usuario a sido eliminada correctamente"})
    }catch(error){
        return res.status(500).json ({
            message: "Error al tratar de eliminar la informacion solicitada",
            error: error.message
        })
    }
}
export const updatePersonalInfo = async () => {
    try{
        const { id } = req.params;

        const info = await PersonalInfo.findByPk(id)
        if(!info) {
            return res.status(404).json( { message: "Informacion del usuario encontrada"});
        }

        await PersonalInfo.update(req.body);

        return res.status(200).json(info)
    }catch(error){
        return res.status(500).json( { message: "Error al actualizar la informacion del usuario", error: error.message })
    }
}
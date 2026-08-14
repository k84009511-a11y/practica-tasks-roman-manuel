import { Tag } from "../models/tag.model.js";
import { Task } from "../models/task.model.js";

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const newTag = await Tag.create({ name });

    return res.status(201).json(newTag);
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear la etiqueta",
      error: error.message
    });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({});

    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message
    });
  }
};

export const getTagsById = async (req, res) => {
  try {
    const { id } = req.params;
    const tagFind = await Tag.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!tagFind) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    return res.status(200).json(tagFind);
  } catch (error) {
    return res.status(500).json({
      message: "Error al buscar la etiqueta",
      error: error.message
    });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tagDell = await Tag.destroy({ where: { id } });

    if (!tagDell) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    return res.status(200).json({ message: "Etiqueta eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al tratar de eliminar la etiqueta",
      error: error.message
    });
  }
};

export const addTagToTask = async (req, res) => {
  try {
    const { taskId, tagId } = req.params;

    const task = await Task.findByPk(taskId);
    const tag = await Tag.findByPk(tagId);

    if (!task || !tag) {
      return res.status(404).json({ message: "Task o Tag no encontrado" });
    }

    await task.addTag(tag);

    return res.status(200).json({ message: "Tag asignado correctamente", task, tag });
  } catch (error) {
    return res.status(500).json({
      message: "Error al asignar la etiqueta",
      error: error.message
    });
  }
};

export const getTagsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId, { include: Tag });

    if (!task) {
      return res.status(404).json({ message: "Task no encontrada" });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las etiquetas de la task",
      error: error.message
    });
  }
};
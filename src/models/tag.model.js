import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Task } from "./task.model.js";

export const Tag = sequelize.define('Tag', {
  name: {
     type: DataTypes.STRING,
      allowNull: false 
    }
});

Task.belongsToMany(Tag, { through: 'TaskTag', foreignKey: 'tasks_id'});
Tag.belongsToMany(Task, { through: 'TaskTag', foreignKey: 'tags_id'});
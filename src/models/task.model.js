import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize"
import { User } from "./user.model.js"

export const Task = sequelize.define ('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})
Task.belongsTo(User, { foreignKey: "users_id", as:"autor" });

User.hasMany(Task, { foreignKey: "users_id", as:"tareas"})
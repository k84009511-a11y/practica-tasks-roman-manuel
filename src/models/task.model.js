import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize"

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
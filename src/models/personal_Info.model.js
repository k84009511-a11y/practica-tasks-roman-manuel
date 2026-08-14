import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize"
import { User } from "./user.model.js";

export const PersonalInfo = sequelize.define('Personal_Info', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dni: {
        type:DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    cuil:{
        type:DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    birthDate: {
        type:DataTypes.DATEONLY,
        allowNull: true
    },
    gender: {
        type:DataTypes.STRING(20),
        allowNull: true
    },
    height:{
        type: DataTypes.FLOAT,
        allowNull: true
    },
    weight:{
        type: DataTypes.FLOAT,
        allowNull: true
    }
});
User.hasOne(PersonalInfo, { foreignKey: 'users_id', as:'InfoPersonal'})
PersonalInfo.belongsTo(User, { foreignKey: 'users_id', as: 'Usuario'})
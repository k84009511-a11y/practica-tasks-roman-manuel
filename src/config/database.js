import { Sequelize } from 'sequelize';


export const sequelize = new Sequelize("tasks_users_db", "root", "", {
    host: "localhost",
    port: 3307,
    dialect: "mysql",
    logging: false 
});


export const startDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Base de datos conectada correctamente.");

    
    await sequelize.sync({ force: true}); 
    console.log(" Tablas sincronizadas con éxito.");
  } catch (error) {
    console.error(" Error al conectar con la base de datos:", error.message);
  }
};
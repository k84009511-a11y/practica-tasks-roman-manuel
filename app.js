import express from "express";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";

const app = express();
const PORT = 3000

app.use(express.json())

app.use(userRouter);
app.use(taskRouter);

const main = async  () => {
    try{
        await startDB();

        app.listen(PORT, () =>{
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
        }catch (error) {
            console.error("Error al iniciar el servidor", error)
        }
    };

main()
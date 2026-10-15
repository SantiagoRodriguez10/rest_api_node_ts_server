import express from "express"
import colors from 'colors'
import router from "./router"
import db from "./config/db"


// Conectar a Base de Datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.bgBlue("Conexión exitosa a la DB"));
        
    } catch (error) {
        console.log(error);
        console.log(colors.bgRed.white('Hubo un error al conectar la base de datos'));
        
    }
}

connectDB()

// Instancia de express
const server = express()


// Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)


export default server
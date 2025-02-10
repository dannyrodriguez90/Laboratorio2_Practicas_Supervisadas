"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { conexionDB } from "./mongo.js"
import rutasAuth from "../src/auth/rutas.auth.js"
import rutasEstudiante from "../src/estudiante/rutas.estudiante.js"
import rutasProfesor from "../src/teacher/rutas.profesor.js"
import rutasClases from "../src/classes/rutas.clases.js"
import limitadorApi from "../src/middlewares/limitador-api.js"

const middlewares = (app) => { 
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(limitadorApi)
}

const rutas = (app) => {
    app.use("/v1/auth", rutasAuth)
    app.use("/v1/estudiante", rutasEstudiante)
    app.use("/v1/profesor", rutasProfesor)
    app.use("/v1/clase", rutasClases)
}

const conectarDB = async () => {
    try {
        await conexionDB()
    } catch (err) {
        console.log(`fallo en la conexión a la base de datos: ${err}`)
        process.exit(1)
    }
}

export const iniciarServidor = () => {
    const app = express()
    try {
        middlewares(app)
        conectarDB()
        rutas(app)
        app.listen(process.env.PORT, () => {
            console.log(`servidor corriendo en el puerto ${process.env.PORT}`)
        })
    } catch (err) {
        console.log(`fallo en la inicialización del servidor: ${err}`)
    }
}
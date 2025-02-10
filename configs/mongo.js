'use strict'

import mongoose from "mongoose"

export const conexionDB = async () => {
    try {
        mongoose.connection.on("error", () => {
            console.log("No se pudo conectar a MongoDB")
            mongoose.disconnect()
        })
        mongoose.connection.on("connecting", () => {
            console.log("Intentando conectar al servidor")
        })
        mongoose.connection.on("connected", () => {
            console.log("Conectado al servidor")
        })
        mongoose.connection.on("open", () => {
            console.log("Ya estás conectado a la base de datos")
        })
        mongoose.connection.on("reconnected", () => {
            console.log("Reconectado al servidor")
        })
        mongoose.connection.on("disconnected", () => {
            console.log("Desconectado del servidor")
        })

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        })
    } catch (err) {
        console.log(`Fallo en la conexión a la base de datos: ${err}`)
    }
}
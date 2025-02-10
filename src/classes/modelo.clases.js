import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EsquemaClases = new Schema({
    nombreClase: {
        type: String,
        required: [true, "El nombre de la clase es requerido"]
    },
    estudiantes: [{
        type: Schema.ObjectId,
        ref: 'Estudiante'
    }],
    profesor: {
        type: Schema.ObjectId,
        ref: 'Profesor',
        required: [true, "El profesor es requerido"]
    },
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Clase", EsquemaClases);
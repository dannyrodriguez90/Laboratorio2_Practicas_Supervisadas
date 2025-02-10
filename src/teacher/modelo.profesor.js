import mongoose from "mongoose";

const EsquemaProfesor = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    correo: {
        type: String,
        required: [true, "El correo es requerido"],
        unique: true
    },
    contraseña: {
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    asignatura: {
        type: String,
        required: [true, "La asignatura es requerida"]
    },
    clases: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Clase'
    }]
},
{
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Profesor", EsquemaProfesor);
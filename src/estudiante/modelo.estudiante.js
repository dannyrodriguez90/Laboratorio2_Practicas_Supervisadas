import { Schema, model } from "mongoose";

const EsquemaEstudiante = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es requerido"]
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
    telefono: {
        type: String,
        minLength: 8,
        required: [true, "El teléfono es requerido"],
        unique: true
    },
    rol: {
        type: String,
        required: true,
        enum: ["ROL_ESTUDIANTE", "ROL_PROFESOR"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    clases: [{
        type: Schema.ObjectId,
        ref: 'Clase'
    }]
},
{
    versionKey: false,
    timestamps: true
});

EsquemaEstudiante.methods.toJSON = function() {
    const { _id, contraseña, ...estudiante } = this.toObject();
    estudiante.uid = _id;
    return estudiante;
};

export default model("Estudiante", EsquemaEstudiante);
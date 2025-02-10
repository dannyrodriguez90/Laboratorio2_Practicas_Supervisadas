import { hash, verify } from "argon2";
import Profesor from "./modelo.profesor.js";
import Clase from "../classes/modelo.clases.js";
import Estudiante from "../estudiante/modelo.estudiante.js";

export const obtenerProfesorPorId = async (req, res) => {
    try {
        const { uid } = req.params;
        const profesor = await Profesor.findById(uid).populate('classes');

        if (!profesor) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            profesor
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el profesor",
            error: err.message
        });
    }
};

export const obtenerProfesores = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, profesores] = await Promise.all([
            Profesor.countDocuments(query),
            Profesor.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('classes')
        ]);

        return res.status(200).json({
            success: true,
            total,
            profesores
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los profesores",
            error: err.message
        });
    }
};

export const eliminarProfesor = async (req, res) => {
    try {
        const { uid } = req.params;

        const profesor = await Profesor.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Profesor eliminado",
            profesor
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el profesor",
            error: err.message
        });
    }
};

export const actualizarContraseña = async (req, res) => {
    try {
        const { uid } = req.params;
        const { nuevaContraseña } = req.body;

        const profesor = await Profesor.findById(uid);

        const coincidenContraseñas = await verify(profesor.password, nuevaContraseña);

        if (coincidenContraseñas) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const contraseñaEncriptada = await hash(nuevaContraseña);

        await Profesor.findByIdAndUpdate(uid, { password: contraseñaEncriptada }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};

export const actualizarProfesor = async (req, res) => {
    try {
        const { uid } = req.params;
        const datos = req.body;

        const profesor = await Profesor.findByIdAndUpdate(uid, datos, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Profesor actualizado',
            profesor,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar profesor',
            error: err.message
        });
    }
};

export const crearClase = async (req, res) => {
    try {
        const { uid } = req.params;
        const datos = req.body;

        const profesor = await Profesor.findById(uid);

        if (!profesor) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        datos.profesor = uid;
        const nuevaClase = await Clase.create(datos);

        profesor.classes.push(nuevaClase._id);
        await profesor.save();

        return res.status(201).json({
            success: true,
            message: "Clase creada",
            clase: nuevaClase
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la clase",
            error: err.message
        });
    }
};

export const actualizarClase = async (req, res) => {
    try {
        const { idClase } = req.params;
        const datos = req.body;

        const clase = await Clase.findByIdAndUpdate(idClase, datos, { new: true });

        if (!clase) {
            return res.status(404).json({
                success: false,
                message: "Clase no encontrada"
            });
        }

        // Actualizar la clase en los estudiantes asignados
        await Estudiante.updateMany(
            { classes: idClase },
            { $set: { "classes.$": clase._id } }
        );

        return res.status(200).json({
            success: true,
            message: "Clase actualizada",
            clase
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la clase",
            error: err.message
        });
    }
};

export const eliminarClase = async (req, res) => {
    try {
        const { idClase } = req.params;

        const clase = await Clase.findByIdAndDelete(idClase);

        if (!clase) {
            return res.status(404).json({
                success: false,
                message: "Clase no encontrada"
            });
        }

        // Desasignar la clase de los estudiantes
        await Estudiante.updateMany(
            { classes: idClase },
            { $pull: { classes: idClase } }
        );

        return res.status(200).json({
            success: true,
            message: "Clase eliminada",
            clase
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la clase",
            error: err.message
        });
    }
};

export const obtenerClasesPorProfesor = async (req, res) => {
    try {
        const { uid } = req.params;
        const profesor = await Profesor.findById(uid).populate('classes');

        if (!profesor) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            clases: profesor.classes
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las clases",
            error: err.message
        });
    }
};
import { hash, verify } from "argon2";
import Estudiante from "./modelo.estudiante.js";
import Clase from "../classes/modelo.clases.js";

export const obtenerEstudiantePorId = async (req, res) => {
    try {
        const { uid } = req.params;
        const estudiante = await Estudiante.findById(uid).populate('classes');

        if (!estudiante) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            estudiante
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el estudiante",
            error: err.message
        });
    }
};

export const obtenerEstudiantes = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, estudiantes] = await Promise.all([
            Estudiante.countDocuments(query),
            Estudiante.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('classes')
        ]);

        return res.status(200).json({
            success: true,
            total,
            estudiantes
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los estudiantes",
            error: err.message
        });
    }
};

export const eliminarEstudiante = async (req, res) => {
    try {
        const { uid } = req.params;

        const estudiante = await Estudiante.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Estudiante eliminado",
            estudiante
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el estudiante",
            error: err.message
        });
    }
};

export const actualizarContraseña = async (req, res) => {
    try {
        const { uid } = req.params;
        const { nuevaContraseña } = req.body;

        const estudiante = await Estudiante.findById(uid);

        const coincideConAnterior = await verify(estudiante.password, nuevaContraseña);

        if (coincideConAnterior) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const contraseñaEncriptada = await hash(nuevaContraseña);

        await Estudiante.findByIdAndUpdate(uid, { password: contraseñaEncriptada }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la contraseña",
            error: err.message
        });
    }
};

export const actualizarEstudiante = async (req, res) => {
    try {
        const { uid } = req.params;
        const datos = req.body;

        const estudiante = await Estudiante.findByIdAndUpdate(uid, datos, { new: true });

        res.status(200).json({
            success: true,
            message: 'Estudiante actualizado',
            estudiante,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el estudiante',
            error: err.message
        });
    }
};

export const asignarClase = async (req, res) => {
    try {
        const { uid } = req.params;
        const { classId } = req.body;

        const estudiante = await Estudiante.findById(uid);
        const clase = await Clase.findById(classId);

        if (!estudiante || !clase) {
            return res.status(404).json({
                success: false,
                message: "Estudiante o clase no encontrado"
            });
        }

        if (estudiante.classes.length >= 3) {
            return res.status(400).json({
                success: false,
                message: "El estudiante ya está asignado a 3 clases"
            });
        }

        if (estudiante.classes.includes(classId)) {
            return res.status(400).json({
                success: false,
                message: "El estudiante ya está asignado a esta clase"
            });
        }

        estudiante.classes.push(classId);
        await estudiante.save();

        return res.status(200).json({
            success: true,
            message: "Clase asignada al estudiante",
            estudiante
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al asignar la clase",
            error: err.message
        });
    }
};

export const obtenerClasesAsignadas = async (req, res) => {
    try {
        const { uid } = req.params;
        const estudiante = await Estudiante.findById(uid).populate('classes');

        if (!estudiante) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            clases: estudiante.classes
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las clases asignadas",
            error: err.message
        });
    }
};

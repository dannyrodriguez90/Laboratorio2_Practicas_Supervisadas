import Clase from "./modelo.clases.js";
import Estudiante from "../estudiante/modelo.estudiante.js";
import Profesor from "../teacher/modelo.profesor.js";

export const crearClase = async (req, res) => {
    try {
        const datos = req.body;

        const profesor = await Profesor.findById(datos.profesor);
        if (!profesor) {
            return res.status(404).json({
                exito: false,
                mensaje: "Profesor no encontrado"
            });
        }

        const nuevaClase = await Clase.create(datos);

        profesor.clases.push(nuevaClase._id);
        await profesor.save();

        return res.status(201).json({
            exito: true,
            mensaje: "Clase creada",
            clase: nuevaClase
        });
    } catch (err) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al crear la clase",
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
                exito: false,
                mensaje: "Clase no encontrada"
            });
        }

        await Estudiante.updateMany(
            { clases: idClase },
            { $set: { "clases.$": clase._id } }
        );

        return res.status(200).json({
            exito: true,
            mensaje: "Clase actualizada",
            clase
        });
    } catch (err) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al actualizar la clase",
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
                exito: false,
                mensaje: "Clase no encontrada"
            });
        }

        // Desasignar la clase de los estudiantes
        await Estudiante.updateMany(
            { clases: idClase },
            { $pull: { clases: idClase } }
        );

        return res.status(200).json({
            exito: true,
            mensaje: "Clase eliminada",
            clase
        });
    } catch (err) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al eliminar la clase",
            error: err.message
        });
    }
};

export const obtenerClasePorId = async (req, res) => {
    try {
        const { idClase } = req.params;
        const clase = await Clase.findById(idClase).populate('estudiantes profesor');

        if (!clase) {
            return res.status(404).json({
                exito: false,
                mensaje: "Clase no encontrada"
            });
        }

        return res.status(200).json({
            exito: true,
            clase
        });
    } catch (err) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al obtener la clase",
            error: err.message
        });
    }
};

export const obtenerClases = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, clases] = await Promise.all([
            Clase.countDocuments(query),
            Clase.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('estudiantes profesor')
        ]);

        return res.status(200).json({
            exito: true,
            total,
            clases
        });
    } catch (err) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al obtener las clases",
            error: err.message
        });
    }
};

export const asignarEstudianteAClase = async (req, res) => {
    try {
        const { idClase, idEstudiante } = req.params;

        const clase = await Clase.findById(idClase);
        const estudiante = await Estudiante.findById(idEstudiante);

        if (!clase || !estudiante) {
            return res.status(404).json({
                exito: false,
                mensaje: "Clase o estudiante no encontrado"
            });
        }

        if (estudiante.clases.length >= 3) {
            return res.status(400).json({
                exito: false,
                mensaje: "El estudiante ya está asignado a 3 clases"
            });
        }

        if (estudiante.clases.includes(idClase)) {
            return res.status(400).json({
                exito: false,
                mensaje: "El estudiante ya está asignado a esta clase"
            });
        }

        estudiante.clases.push(idClase);
        await estudiante.save();

        clase.estudiantes.push(idEstudiante);
        await clase.save();

        return res.status(200).json({
            exito: true,
            mensaje: "Estudiante asignado a la clase",
            clase
        });
    } catch (err) {
        return res.status(500).json({
            exito: false,
            mensaje: "Error al asignar estudiante a la clase",
            error: err.message
        });
    }
};
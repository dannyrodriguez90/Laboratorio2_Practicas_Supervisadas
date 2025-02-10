import Estudiante from "../estudiante/modelo.estudiante.js";
import Profesor from "../teacher/modelo.profesor.js";

export const emailExisteEstudiante = async (correo = "") => {
    const correoExistente = await Estudiante.findOne({ correo });
    if (correoExistente) {
        throw new Error(`El correo ${correo} ya está registrado para un estudiante`);
    }
};

export const emailExisteProfesor = async (correo = "") => {
    const correoExistente = await Profesor.findOne({ correo });
    if (correoExistente) {
        throw new Error(`El correo ${correo} ya está registrado para un profesor`);
    }
};

export const usuarioExiste = async (identificador = "") => {
    const estudianteExistente = await Estudiante.findOne({ correo: identificador });
    const profesorExistente = await Profesor.findOne({ correo: identificador });

    if (estudianteExistente || profesorExistente) {
        throw new Error(`El usuario con el correo ${identificador} ya está registrado`);
    }
};

export const usuarioExistePorId = async (uid = "") => {
    const estudianteExistente = await Estudiante.findById(uid);
    const profesorExistente = await Profesor.findById(uid);

    if (!estudianteExistente && !profesorExistente) {
        throw new Error("No existe el usuario con el ID proporcionado");
    }
};
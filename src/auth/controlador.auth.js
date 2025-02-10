import { hash, verify } from "argon2";
import Estudiante from "../estudiante/modelo.estudiante.js";
import Profesor from "../teacher/modelo.profesor.js";


export const registrar = async (req, res) => {
    try {
        const datos = req.body;
        let fotoPerfil = req.file ? req.file.filename : null;
        const contraseñaEncriptada = await hash(datos.contraseña);
        datos.contraseña = contraseñaEncriptada;
        datos.fotoPerfil = fotoPerfil;

        let usuario;
        if (datos.rol === "ROL_ESTUDIANTE") {
            usuario = await Estudiante.create(datos);
        } else if (datos.rol === "ROL_PROFESOR") {
            usuario = await Profesor.create(datos);
        } else {
            return res.status(400).json({
                mensaje: "Rol especificado no válido"
            });
        }

        return res.status(201).json({
            mensaje: "Usuario creado",
            nombre: usuario.nombre,
            correo: usuario.correo
        });
    } catch (err) {
        return res.status(500).json({
            mensaje: "Error en el registro del usuario",
            error: err.message
        });
    }
};

export const iniciarSesion = async (req, res) => {
    const { correo, nombreUsuario, contraseña } = req.body;
    try {
        let usuario = await Estudiante.findOne({
            $or: [{ correo: correo }, { nombreUsuario: nombreUsuario }]
        });

        if (!usuario) {
            usuario = await Profesor.findOne({
                $or: [{ correo: correo }, { nombreUsuario: nombreUsuario }]
            });
        }

        if (!usuario) {
            return res.status(400).json({
                mensaje: "Credenciales no válidas",
                error: "No se encontró un usuario con el correo o nombre de usuario proporcionado"
            });
        }

        const contraseñaValida = await verify(usuario.contraseña, contraseña);

        if (!contraseñaValida) {
            return res.status(400).json({
                mensaje: "Credenciales no válidas",
                error: "Contraseña incorrecta"
            });
        }


        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            detallesUsuario: {
                fotoPerfil: usuario.fotoPerfil,
                rol: usuario.rol
            }
        });
    } catch (err) {
        return res.status(500).json({
            mensaje: "Error en el inicio de sesión, error del servidor",
            error: err.message
        });
    }
};
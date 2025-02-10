import { body, param } from "express-validator";
import { emailExisteProfesor, usuarioExistePorId } from "../helpers/db-validators.js"; // Corregir nombre de la importación
import { validarCampos } from "./validar-campos.js";
import { manejarErrores } from "./manejar-errores.js";

export const validarRegistroProfesor = [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("apellido").notEmpty().withMessage("El apellido es requerido"),
    body("correo").notEmpty().withMessage("El correo es requerido"),
    body("correo").isEmail().withMessage("No es un correo válido"),
    body("correo").custom(emailExisteProfesor), // Corregir nombre de la función
    body("contraseña").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo"),
    validarCampos,
    manejarErrores
];

export const validarInicioSesionProfesor = [
    body("correo").optional().isEmail().withMessage("No es un correo válido"),
    body("nombreUsuario").optional().isString().withMessage("El nombre de usuario es en formato erróneo"),
    body("contraseña").isLength({ min: 8 }).withMessage("La contraseña debe contener al menos 8 caracteres"),
    validarCampos,
    manejarErrores
];

export const validarUsuarioPorId = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(usuarioExistePorId),
    validarCampos,
    manejarErrores
];

export const validarEliminarUsuario = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(usuarioExistePorId),
    validarCampos,
    manejarErrores
];

export const validarActualizarContraseña = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(usuarioExistePorId),
    body("nuevaContraseña").isLength({ min: 8 }).withMessage("La contraseña debe contener al menos 8 caracteres"),
    validarCampos,
    manejarErrores
];

export const validarActualizarUsuario = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(usuarioExistePorId),
    validarCampos,
    manejarErrores
];

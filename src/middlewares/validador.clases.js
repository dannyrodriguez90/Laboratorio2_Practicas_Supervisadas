import { body, param } from "express-validator";
import { usuarioExistePorId } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { manejarErrores } from "./manejar-errores.js";

export const validadorCrearClase = [
    body("nombreClase").notEmpty().withMessage("El nombre de la clase es requerido"),
    body("profesor").notEmpty().withMessage("El ID del profesor es requerido"),
    body("profesor").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("profesor").custom(usuarioExistePorId),
    body("estudiantes").isArray().withMessage("Los estudiantes deben ser un arreglo de IDs"),
    body("estudiantes.*").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("estudiantes.*").custom(usuarioExistePorId),
    body("horario").notEmpty().withMessage("El horario es requerido"),
    validarCampos,
    manejarErrores
];

export const validadorActualizarClase = [
    param("idClase").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("nombreClase").optional().notEmpty().withMessage("El nombre de la clase es requerido"),
    body("profesor").optional().isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("profesor").optional().custom(usuarioExistePorId),
    body("estudiantes").optional().isArray().withMessage("Los estudiantes deben ser un arreglo de IDs"),
    body("estudiantes.*").optional().isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("estudiantes.*").optional().custom(usuarioExistePorId),
    body("horario").optional().notEmpty().withMessage("El horario es requerido"),
    validarCampos,
    manejarErrores
];

export const validadorObtenerClasePorId = [
    param("idClase").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    manejarErrores
];

export const validadorEliminarClase = [
    param("idClase").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    manejarErrores
];
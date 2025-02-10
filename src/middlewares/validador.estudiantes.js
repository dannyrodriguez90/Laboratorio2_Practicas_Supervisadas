import { param, body } from "express-validator";
import { usuarioExistePorId } from "../helpers/db-validators.js";

export const validarEstudiantePorId = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(usuarioExistePorId),
];

export const validarEliminacionEstudiante = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(usuarioExistePorId),
];

export const validarActualizarContraseña = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(usuarioExistePorId),
    body("nuevaContraseña").isLength({ min: 8 }).withMessage("La contraseña debe contener al menos 8 caracteres"),
];

export const validarActualizacionEstudiante = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(usuarioExistePorId),
];

export const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

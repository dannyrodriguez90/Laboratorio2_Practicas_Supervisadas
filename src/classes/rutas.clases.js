import { Router } from "express";
import { crearClase, actualizarClase, eliminarClase, obtenerClasePorId, obtenerClases, asignarEstudianteAClase } from "./controlador.clases.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { manejarErrores } from "../middlewares/manejar-errores.js";
import { body, param } from "express-validator";
import limitadorApi from "../middlewares/limitador-api.js";

const router = Router();

router.post("/crearClase", [
    body("nombreClase").notEmpty().withMessage("El nombre de la clase es requerido"),
    body("profesor").notEmpty().withMessage("El ID del profesor es requerido"),
    body("profesor").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    manejarErrores
], crearClase);

router.put("/actualizarClase/:idClase", [
    param("idClase").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("nombreClase").optional().notEmpty().withMessage("El nombre de la clase es requerido"),
    validarCampos,
    manejarErrores
], actualizarClase);

router.delete("/eliminarClase/:idClase", [
    param("idClase").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    manejarErrores
], eliminarClase);

router.get("/obtenerClase/:idClase", [
    param("idClase").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    manejarErrores
], obtenerClasePorId);

router.get("/", limitadorApi, obtenerClases);

router.post("/asignarEstudianteAClase/:idClase/:idEstudiante", [
    param("idClase").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("idEstudiante").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    manejarErrores
], asignarEstudianteAClase);

export default router;
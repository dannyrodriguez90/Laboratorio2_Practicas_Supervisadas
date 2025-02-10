import { Router } from "express";
import { param, body } from "express-validator"; // Importar param y body
import { obtenerProfesorPorId, obtenerProfesores, eliminarProfesor, actualizarContraseña, actualizarProfesor, crearClase, actualizarClase, eliminarClase, obtenerClasesPorProfesor } from "./controlador.profesor.js";
import { validarUsuarioPorId, validarEliminarUsuario, validarActualizarContraseña, validarActualizarUsuario } from "../middlewares/validador.profesor.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import limitadorApi from "../middlewares/limitador-api.js";

const router = Router();

router.get("/buscarProfesor/:uid", validarUsuarioPorId, validarCampos, obtenerProfesorPorId);

router.get("/", limitadorApi, obtenerProfesores);

router.delete("/eliminarProfesor/:uid", validarEliminarUsuario, validarCampos, eliminarProfesor);

router.patch("/actualizarContraseña/:uid", validarActualizarContraseña, validarCampos, actualizarContraseña);

router.put("/actualizarProfesor/:uid", validarActualizarUsuario, validarCampos, actualizarProfesor);

router.post("/crearClase/:uid", [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("nombreClase").notEmpty().withMessage("El nombre de la clase es requerido"),
    body("horario").notEmpty().withMessage("El horario es requerido"),
    validarCampos
], crearClase);

router.put("/actualizarClase/:idClase", [
    param("idClase").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("nombreClase").optional().notEmpty().withMessage("El nombre de la clase es requerido"),
    body("horario").optional().notEmpty().withMessage("El horario es requerido"),
    validarCampos
], actualizarClase);

router.delete("/eliminarClase/:idClase", [
    param("idClase").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos
], eliminarClase);

router.get("/clasesPorProfesor/:uid", validarUsuarioPorId, validarCampos, obtenerClasesPorProfesor);

export default router;

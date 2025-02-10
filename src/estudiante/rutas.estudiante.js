import { Router } from "express";
import { param, body } from "express-validator"; 
import { obtenerEstudiantePorId, obtenerEstudiantes, eliminarEstudiante, actualizarContraseña, actualizarEstudiante, asignarClase, obtenerClasesAsignadas } from "./estudiante.controller.js";
import { validarEstudiantePorId, validarEliminacionEstudiante, validarActualizarContraseña, validarActualizacionEstudiante } from "../middlewares/validador.estudiantes.js"; 
import { validarCampos } from "../middlewares/validar-campos.js";
import limitadorApi from "../middlewares/limitador-api.js";

const router = Router();

router.get("/buscarEstudiante/:uid", validarEstudiantePorId, validarCampos, obtenerEstudiantePorId);

router.get("/", limitadorApi, obtenerEstudiantes);

router.delete("/eliminarEstudiante/:uid", validarEliminacionEstudiante, validarCampos, eliminarEstudiante);

router.patch("/actualizarContraseña/:uid", validarActualizarContraseña, validarCampos, actualizarContraseña);  

router.put("/actualizarEstudiante/:uid", validarActualizacionEstudiante, validarCampos, actualizarEstudiante);

router.post("/asignarClase/:uid", [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("idClase").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos
], asignarClase);

router.get("/clasesAsignadas/:uid", validarEstudiantePorId, validarCampos, obtenerClasesAsignadas);

export default router;

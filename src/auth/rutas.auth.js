import express from 'express';
import { registrar, iniciarSesion } from "./controlador.auth.js";
import { validadorAuth } from '../middlewares/validador.auth.js'; // Verifica que este archivo exista
import { validarCampos } from "../middlewares/validar-campos.js"; 
import limitadorApi from "../middlewares/limitador-api.js";

const router = express.Router();

router.post("/registrar", limitadorApi, validadorAuth, validarCampos, registrar);
router.post("/iniciarSesion", limitadorApi, validadorAuth, validarCampos, iniciarSesion);

export default router;
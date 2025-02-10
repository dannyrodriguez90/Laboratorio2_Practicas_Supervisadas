import rateLimit from "express-rate-limit";

const limitadorApi = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 50, 
    message: {
        exito: false,
        mensaje: "Demasiadas solicitudes, por favor intente de nuevo más tarde."
    }
});

export default limitadorApi;
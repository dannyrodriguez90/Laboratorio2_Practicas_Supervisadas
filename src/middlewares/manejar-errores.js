export const manejarErrores = (err, req, res, next) => {
    if (err.status === 400 || err.errors) {
        return res.status(400).json({
            exito: false,
            errores: err.errores
        });
    }
    return res.status(500).json({
        exito: false,
        mensaje: err.message
    });
};
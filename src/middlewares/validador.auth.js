export const validadorAuth = (req, res, next) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ mensaje: "Correo y contraseña son requeridos" });
  }

  next();
};
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.format();
    return res.status(400).json({ error: "Datos inválidos", details: errors });
  }

  req.body = result.data; // Limpieza de datos
  next();
};

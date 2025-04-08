import { prisma } from "../prisma/client.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación simple
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // ¿Ya existe?
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Crear usuario (sin hashear por ahora, lo agregamos después)
    const user = await prisma.user.create({
      data: { name, email, password },
    });

    res.status(201).json({ message: "Usuario creado", user });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

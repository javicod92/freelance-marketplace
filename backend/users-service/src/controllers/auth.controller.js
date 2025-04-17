import { prisma } from "../prisma/client.js";
import { hashPassword, comparePasswords } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    console.error("Error al buscar usuario:", error.message);
    res.status(500).json({ error: "Error al buscar usuario" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Error, the e-mail already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "user",
      },
    });

    res.status(201).json({
      message: "Usuario creado",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email y contraseña son obligatorios" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "User account doesn't exist" });
    }

    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error al hacer login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, email },
    });

    res.json({ message: "Perfil actualizado", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar perfil" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.json({ message: "Cuenta eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la cuenta" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

import express from "express";
import {
  register,
  login,
  updateProfile,
  deleteAccount,
  getAllUsers,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validations/auth.schema.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});
router.put("/profile", authenticateToken, updateProfile);
router.delete("/profile", authenticateToken, deleteAccount);
router.get("/all", authenticateToken, authorizeRole("admin"), getAllUsers);

// Endpoints used only for testing
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Acceso autorizado",
    user: req.user,
  });
});

router.get("/admin", authenticateToken, authorizeRole("admin"), (req, res) => {
  res.json({
    message: "Solo los administradores pueden ver esto",
    user: req.user,
  });
});

export default router;

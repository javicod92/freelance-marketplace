import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validations/auth.schema.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// Endpoint used only for testing
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Acceso autorizado",
    user: req.user,
  });
});

export default router;

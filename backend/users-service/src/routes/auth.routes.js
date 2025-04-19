import express from "express";
import {
  register,
  login,
  updateProfile,
  deleteAccount,
  getAllUsers,
  getUserById,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validations/auth.schema.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register); // Register a new user
router.post("/login", validate(loginSchema), login); // Login an user
router.get("/user/:id", getUserById); // Obtain user data throught an id
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ user: req.user }); // Obtain the user data of the current user
});
router.put("/profile", authenticateToken, updateProfile); // Update data profile
router.delete("/profile", authenticateToken, deleteAccount); // Delete account
router.get("/all", authenticateToken, authorizeRole("admin"), getAllUsers); // Obtain all users

export default router;

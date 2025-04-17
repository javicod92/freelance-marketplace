import { Router } from "express";
import {
  createListing,
  getAllListings,
} from "../controllers/listings.controller.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllListings);
router.post("/", authenticateToken, createListing);

export default router;

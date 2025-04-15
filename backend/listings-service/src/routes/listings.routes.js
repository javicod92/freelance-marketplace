import { Router } from "express";
import {
  createListing,
  getAllListings,
  testRoute,
} from "../controllers/listings.controller.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = Router();

router.get("/test", testRoute);
router.get("/", getAllListings);
router.post("/", authenticateToken, createListing);

export default router;

import { Router } from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getListingById,
  updateListing,
} from "../controllers/listings.controller.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllListings);
router.post("/", authenticateToken, createListing);
router.get("/:id", getListingById);
router.put("/:id", updateListing);
router.delete("/:id", deleteListing);

export default router;

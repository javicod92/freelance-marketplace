import { Router } from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getListingById,
  updateListing,
} from "../controllers/listings.controller.js";
import { authenticateToken } from "@freelance-marketplace/shared";

const router = Router();

router.get("/", authenticateToken, getAllListings);
router.post("/", authenticateToken, createListing);
router.get("/:id", authenticateToken, getListingById);
router.put("/:id", authenticateToken, updateListing);
router.delete("/:id", authenticateToken, deleteListing);

/* Attention: GET, POST, PUT and DELETE methods must not have /:id parameters, since a registered
user may have the possibility to manipulate all data of any user. To avoid this,
the user id must be extracted directly from the token. */

export default router;

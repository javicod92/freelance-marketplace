import express from "express";
import { getListingsWithUsers } from "../controllers/listings.controller.js";

const router = express.Router();

router.get("/listings-with-users", getListingsWithUsers);

export default router;

import { Router } from "express";
import { testRoute } from "../controllers/listings.controller.js";

const router = Router();

router.get("/test", testRoute);

export default router;

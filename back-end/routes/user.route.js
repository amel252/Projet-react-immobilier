import express from "express";
import { test } from "../controllers/user.controller.js";

// on utilise expresse pour les routes
const router = express.Router();
router.get("/test", test);
export default router;

import { Router } from "express";
import { getUsers } from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

// Protected route
router.get("/users", authMiddleware, getUsers);

export default router;
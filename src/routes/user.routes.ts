import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { getUsers, createUserController, updateUserController, deleteUserController } from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import { createUserSchema } from "../validators/user.validator";

const router = Router();

// Protected route
router.get("/users", authMiddleware, getUsers);
router.post("/users", authMiddleware, validate(createUserSchema), createUserController);
router.put("/users/:id", authMiddleware, updateUserController);
router.delete("/users/:id", authMiddleware, validate(createUserSchema), deleteUserController);

export default router;
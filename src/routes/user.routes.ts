import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { getUsers, createUserController, updateUserController, deleteUserController } from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import { createUserSchema, updateUserSchema } from "../validators/user.validator";

const router = Router();

// Protected route
router.get("/users", authMiddleware, getUsers);
router.post("/users", authMiddleware, validate(createUserSchema), createUserController);
router.put("/users/:id", authMiddleware, validate(updateUserSchema), updateUserController);
router.delete("/users/:id", authMiddleware, deleteUserController);

export default router;
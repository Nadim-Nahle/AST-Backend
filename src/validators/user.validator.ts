import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z
    .string()
    .regex(/^[A-Za-z]+$/, "First name must contain only letters"),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, "Last name must contain only letters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"), // ✅ REQUIRED
  avatar: z.string().url("Avatar must be a valid URL").optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  firstName: z
    .string()
    .regex(/^[A-Za-z]+$/, "First name must contain only letters")
    .optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, "Last name must contain only letters")
    .optional(),
  jobTitle: z
    .string()
    .min(2, "Job title must be at least 2 characters")
    .optional(),
    avatar: z.string().url().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

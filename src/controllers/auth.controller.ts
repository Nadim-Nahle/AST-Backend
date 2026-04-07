import { Request, Response } from "express";
import { LoginDto, AuthResponse } from "../types/user";
import { getPaginatedUsers, createUser, updateUser, deleteUser } from "../services/user.service";
import { toUserResponse } from "../mappers/user.mapper";
import { GetUsersQuery, PaginatedResponse, UserResponseDto, UserCreateDto, UserUpdateDto } from "../types/user";
import { createUserSchema, UpdateUserInput, updateUserSchema } from "../validators/user.validator";

export const login = (
  req: Request<{}, {}, LoginDto>,
  res: Response
) => {
  const { email, password } = req.body;

  if (email !== "admin@example.com" || password !== "password123") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const expiresInMs = 60 * 60 * 1000; // 1 hour
  const expiry = Date.now() + expiresInMs;

  const token = `mock-token-${expiry}`;

  return res.json({
    token,
    user: {
      id: "admin-id",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      jobTitle: "Admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });
};

export const getUsers = async (
  req: Request<{}, {}, {}, GetUsersQuery>,
  res: Response
) => {
  try {
    const page = parseInt(req.query.page ?? "1", 10);
    const limit = parseInt(req.query.limit ?? "5", 10);

    const result = await getPaginatedUsers(page, limit);

    const response: PaginatedResponse<UserResponseDto> = {
      ...result,
      data: result.data.map(toUserResponse),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const createUserController = async (
  req: Request<{}, {}, UserCreateDto>,
  res: Response
) => {
  try {
    const newUser = await createUser(req.body);

    res.status(201).json(toUserResponse(newUser));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create user",
    });
  }
};

export const updateUserController = async (
  req: Request<{ id: string }, {}, UpdateUserInput>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const updatedUser = await updateUser(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(toUserResponse(updatedUser));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update user",
    });
  }
};

export const deleteUserController = async (
  req: Request<{ id: string }>,
  res: Response<{ message: string }>
) => {
  try {
    const { id } = req.params;

    const deleted = await deleteUser(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};
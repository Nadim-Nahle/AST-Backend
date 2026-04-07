import { getPaginatedUsers } from "../services/user.service";
import { toUserResponse } from "../mappers/user.mapper";
import { GetUsersQuery, PaginatedResponse, UserResponseDto } from "../types/user";
import { Request, Response } from "express";

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
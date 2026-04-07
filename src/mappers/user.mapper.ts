import { User, UserResponseDto } from "../types/user";

export const toUserResponse = (user: User): UserResponseDto => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  avatar: user.avatar,
  jobTitle: user.jobTitle,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
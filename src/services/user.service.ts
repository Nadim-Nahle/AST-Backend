import { readUsers, writeUsers } from "../ultils/file.Utils";
import { User, UserCreateDto, UserUpdateDto } from "../types/user";
import crypto from "crypto";
import { UpdateUserInput } from "../validators/user.validator";

export const getPaginatedUsers = async (
  page: number,
  limit: number
) => {
  const users: User[] = await readUsers();

  const start = (page - 1) * limit;
  const paginated = users.slice(start, start + limit);

  return {
    data: paginated,
    total: users.length,
    page,
    limit,
    totalPages: limit ? Math.ceil(users.length / limit) : 0,
  };
};

export const createUser = async (data: UserCreateDto): Promise<User> => {
  const users: User[] = await readUsers();

  const now = new Date().toISOString();

  const newUser: User = {
    id: crypto.randomUUID(),
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    avatar: data.avatar,
    jobTitle: data.jobTitle,
    createdAt: now,
    updatedAt: now,
  };

  users.push(newUser);

  await writeUsers(users);

  return newUser;
};

export const updateUser = async (
  id: string,
  updates: UpdateUserInput
): Promise<User | null> => {
  const users: User[] = await readUsers();

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return null;

  const existingUser = users[index];

  // 🔥 Prevent id override
  const { id: _, ...safeUpdates } = updates as any;

  const updatedUser: User = {
    ...existingUser,
    ...safeUpdates,
    updatedAt: new Date().toISOString(),
  };

  users[index] = updatedUser;

  await writeUsers(users);

  return updatedUser;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const users: User[] = await readUsers();

  const filteredUsers = users.filter((user) => user.id !== id);

  // If no change → user not found
  if (filteredUsers.length === users.length) {
    return false;
  }

  await writeUsers(filteredUsers);

  return true;
};
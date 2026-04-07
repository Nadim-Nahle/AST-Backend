import { readUsers } from "../ultils/file.utils";
import { User } from "../types/user";

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
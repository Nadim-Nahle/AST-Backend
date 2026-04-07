import fs from "fs/promises";
import path from "path";
import { User } from "../types/user";

const filePath = path.join(__dirname, "../data/users.json");

export const readUsers = async (): Promise<User[]> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const writeUsers = async (users: User[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};

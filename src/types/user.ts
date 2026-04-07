export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  createdAt: string;
  updatedAt: string;
}
 
export interface UserCreateDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
}
 
export interface UserUpdateDto {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  jobTitle: string;
}
 
export interface UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  createdAt: string;
  updatedAt: string;
}
 
export interface LoginDto {
  email: string;
  password: string;
}
 
export interface AuthResponse {
  token: string;
  user: UserResponseDto;
}
 
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetUsersQuery {
  page?: string;
  limit?: string;
}
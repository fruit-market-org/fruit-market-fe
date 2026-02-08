export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginResponse {
  success: boolean;
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

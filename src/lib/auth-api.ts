import { api } from "@/lib/api";
import type { LoginResponse } from "@/types/auth";

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", { email, password });
  if (!data.success) {
    throw new Error("Login failed");
  }
  return data;
}

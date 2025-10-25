export interface User {
  id: number;
  email: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
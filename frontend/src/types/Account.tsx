export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  permission: "Employee" | "Manager" | "Leader";
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
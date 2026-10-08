
export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
};

export type AuthResponse = {
  tokens: Tokens;
  user: User;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  displayName: string;
  password: string;
};

export type AuthIntent = "login" | "register";

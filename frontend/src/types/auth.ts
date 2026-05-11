export type User = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = User;

export type AuthResponse = {
  user: User;
};

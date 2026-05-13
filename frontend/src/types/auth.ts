export type UserData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = UserData;

export type AuthUser = {
  id: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
};

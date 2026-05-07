export type UserSafe = {
    id: string;
    email: string;
    isAdmin: boolean;
}


export type RegisterBody = {
  email: string;
  password: string;
  confirmPassword: String;
};

export type LoginBody = {
    email: string;
    password: string;
}


export type AuthResponse = {
    user:UserSafe
}

export type ErrorResponse = {
    message: String
}
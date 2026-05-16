import axios from "axios";
import type { RegisterData, LoginData } from "../types/auth";

const API_URL = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/auth",
  withCredentials: true,
});

export const getUserService = async () => {
  try {
    const response = await API_URL.get("/user");

    return response.data;
  } catch (error: unknown) {
    return {
      message:
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Unauthorized",
    };
  }
};

export const loginService = async (data: LoginData) => {
  try {
    const response = await API_URL.post("/login", data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Login Failed",
    };
  }
};

export const registerService = async (data: RegisterData) => {
  try {
    const response = await API_URL.post("/register", data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Register failed",
    };
  }
};

export const logoutService = async () => {
  try {
    const response = await API_URL.post("/logout");
    return { success: true, message: response.data.message };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Logout Succesfull",
    };
  }
};

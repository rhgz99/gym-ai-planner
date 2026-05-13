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
  } catch (error) {
    console.error(error);
  }
};

export const loginService = async (data: LoginData) => {
  try {
    const response = await API_URL.post("/login", data);

    return response.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};

export const registerService = async (data: RegisterData) => {
  try {
    const response = await API_URL.post("/register", data);

    return response.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};

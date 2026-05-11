import axios from "axios"
import type { UseFormReset } from "react-hook-form";
import type { AuthResponse, RegisterData } from "../types/auth";

const API_URL = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/auth",
  withCredentials: true
});

export const registerService = async (
  data: RegisterData,
  reset: UseFormReset<RegisterData>,
): Promise<{ success: boolean; data?: AuthResponse }> => {
  try {
    const response = await API_URL.post("/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      reset();
    }

    return {
      success: true,
    };
  } catch (error) {
    console.log(error)
    return {
      success: false,
    };
  }
};

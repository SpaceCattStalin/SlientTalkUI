import axios from "axios";

const BASE_URL = "http://192.168.1.18:5042";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
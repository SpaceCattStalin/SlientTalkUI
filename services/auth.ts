import axios from "axios";

// Đổi 'localhost' thành IP LAN của máy tính chạy backend, ví dụ 192.168.1.10
const BASE_URL = "http://192.168.1.18:5042"; // Sử dụng http nếu backend không bật https

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
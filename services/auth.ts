import axios from "axios";

// const BASE_URL = "http://192.168.1.18:5042";

const BASE_URL = 'http://192.168.1.199:5042';
//const BASE_URL = 'http://192.168.1.153:5042';

//const BASE_URL = 'https://curious-pauline-catchable.ngrok-free.dev';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`/api/auth/login`, { Email: email, Password: password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


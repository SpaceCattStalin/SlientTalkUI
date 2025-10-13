import { RelatedWord, SignWord, WordByIdResponse } from "@/types/Types";
import axios from "axios";

const BASE_URL = 'http://192.168.1.199:5042';

//const BASE_URL = 'http://192.168.1.153:5042';

//const BASE_URL = 'https://curious-pauline-catchable.ngrok-free.dev';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


const _get = (url: string, config = {}) => {
    return apiClient.get(url, config);
};

const _delete = (url: string, config = {}) => {
    return apiClient.delete(url, config);
};

const _put = (url: string, data = {}, config = {}) => {
    return apiClient.put(url, data, config);
};

const _post = (url: string, data = {}, config = {}) => {
    return apiClient.post(url, data, config);
};


const register = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/register`, { email, password });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getWordsByCategory = async (token: string, category?: string) => {
    try {
        const response = await _get(`/api/signwordcollections/by_category`, {
            params: { category },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching words by category:', error.response?.data || error.message);
        throw error;
    }
};
const getWordById = async (token: string, id: string): Promise<WordByIdResponse> => {
    try {
        const response = await _get(`/api/signwordcollections/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching word by ID:', error.response?.data || error.message);
        throw error;
    }
};

const getRelatedWords = async (signWordId: string): Promise<RelatedWord[]> => {
    try {
        const response = await _get(`/api/signwordcollections/${signWordId}/related`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching related words:', error.response?.data || error.message);
        throw error;
    }
};

export const createCollection = async (
    token: string,
    request: { name: string; isDefault: boolean; }
) => {
    try {
        const response = await _post("/api/signwordcollections", request, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        //console.error("Error creating collection:", error.response?.data || error.message);
        throw error;
    }
};

export const addWordToCollection = async (
    token: string,
    request: { collectionId: string; signWordId: string; }
) => {
    try {
        const response = await _post("/api/signwordcollections/add_word", request, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error adding word to collection:", error.response?.data || error.message);
        throw error;
    }
};

export const getMyCollections = async (token: string) => {
    try {
        const response = await _get("/api/signwordcollections/mine", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error fetching user collections:", error.response?.data || error.message);
        throw error;
    }
};


export const getAll = async (token: string) => {
    try {
        const response = await _get("/api/signwordcollections/all_words", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error fetching user collections:", error.response?.data || error.message);
        throw error;
    }
};


export { register, getWordsByCategory, getWordById, getRelatedWords };

import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

const BASE_URL = 'https://api.example.com';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const AI_BASE_URL = "http://localhost:8000";

const apiClient_2 = axios.create({
    baseURL: AI_BASE_URL,
    headers: { "Content-Type": "multipart/form-data" },
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

const _postAI = (url: string, data = {}, config = {}) => {
    return apiClient_2.post(url, data, config);
};




export async function pickAndSendImage() {
    // Pick image from gallery
    let result = await ImagePicker.launchImageLibraryAsync({ base64: false });

    if (result.canceled) {
        return null;
    }

    let uri = result.assets[0].uri;
    let formData = new FormData();
    formData.append("file", {
        uri,
        name: "hand.jpg",
        type: "image/jpeg",
    });

    try {
        let res = await _postAI("/predict");
        let data = await res.json();
        return data.prediction;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}


export { _get, _delete, _put, _post };

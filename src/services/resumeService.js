// resumeService.js

import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/resume";

export const uploadResume = async (formData, token) => {

    const response = await axios.post(
        `${API_URL}/upload`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};


export const getResumeById = async (resumeId, token) => {
    const response = await axios.get(
        `${API_URL}/${resumeId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const analyzeResume = async (resumeId, token) => {
    const response = await axios.post(
        `${API_URL}/analyze/${resumeId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/chat`;

export const chatWithResume = async (resumeId, question, token) => {
  const response = await axios.post(
    `${API_URL}/${resumeId}`,
    { question },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
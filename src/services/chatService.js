import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/chat";

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
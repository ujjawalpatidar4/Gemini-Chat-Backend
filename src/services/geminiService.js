// Gemini API integration service
import axios from 'axios';
import { getAccessToken } from './googleAuth.js'; 

export async function sendGeminiMessage(prompt) {
  const accessToken = await getAccessToken();
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  const response = await axios.post(
    url,
    { contents: [{ parts: [{ text: prompt }] }] },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
}


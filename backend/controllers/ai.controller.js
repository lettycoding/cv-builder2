// controllers/aiController.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
// Import node-fetch to provide the fetch function in a Node.js environment
import fetch from 'node-fetch';

// Polyfill global fetch
global.fetch = fetch;

dotenv.config();

// Ensure you have GEMINI_API_KEY in your .env file
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}

// Initialize the Google Generative AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askAI = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // For text-only input, use a valid model name like 'gemini-1.0-pro'
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Generate content based on the user's prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    // Send the generated answer back to the client
    res.json({ answer });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to fetch AI answer' });
  }
};

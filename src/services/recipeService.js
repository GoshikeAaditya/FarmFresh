

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("Your API Key");

export const generateAIRecipe = async (ingredients) => {
  if (!genAI) {
    throw new Error('Gemini API client is not initialized. Please check your API key.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `Create a recipe using these ingredients: ${ingredients}. If the ingredients are insufficient, kindly suggest what else might be needed. Format:
    • Recipe Name
    • Preparation Time
    • Ingredients List (including any suggested additions)
    • Simple Instructions (numbered steps)
    Keep it brief and practical.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text.length < 50) {
      return "I apologize, but I couldn't generate a recipe right now. Please try again with different ingredients.";
    }

    return text;
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    return "I apologize, but I couldn't generate a recipe right now. Please try again with different ingredients.";
  }
};

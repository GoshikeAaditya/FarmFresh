import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateRecipe = async (ingredients) => {
  try {
    const response = await axios.post(API_URL, {
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "You are a helpful cooking assistant that creates recipes based on available ingredients."
      }, {
        role: "user",
        content: `Create a recipe using these ingredients: ${ingredients}. Include title, ingredients list, and step-by-step instructions.`
      }],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
};
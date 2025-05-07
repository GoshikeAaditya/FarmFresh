import OpenAI from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
}) : null;

export const generateAIRecipe = async (ingredients) => {
  if (!openai) {
    throw new Error('OpenAI client is not initialized. Please check your API key.');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a friendly recipe assistant. Create simple, easy-to-follow recipes. If the ingredients provided are insufficient, ask for more ingredients or suggest additions. Keep responses concise and practical."
        },
        {
          role: "user",
          content: `Create a recipe using these ingredients: ${ingredients}. If the ingredients are insufficient, kindly suggest what else might be needed. Format:
          • Recipe Name
          • Preparation Time
          • Ingredients List (including any suggested additions)
          • Simple Instructions (numbered steps)
          Keep it brief and practical.`
        }
      ],
      temperature: 0.7,
      max_tokens: 400,
      presence_penalty: 0.3,
      frequency_penalty: 0.3
    });

    const response = completion.choices[0].message.content;
    
    // Check if response is too short or generic
    if (response.length < 50) {
      return "I apologize, but I couldn't generate a recipe right now. Please try again with different ingredients.";
    }

    return response;
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    return "I apologize, but I couldn't generate a recipe right now. Please try again with different ingredients.";
  }
};
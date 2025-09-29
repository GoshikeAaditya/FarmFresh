import OpenAI from 'openai';

const apiKey = process.env.REACT_APP_SAMBANOVA_API_KEY;
const baseURL = 'https://api.sambanova.ai/v1';

const sambanova = apiKey ? new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
  dangerouslyAllowBrowser: true
}) : null;

export const generateMealPlan = async (preferences) => {
  if (!sambanova) {
    throw new Error('SambaNova client is not initialized. Please check your API key.');
  }

  try {
    const completion = await sambanova.chat.completions.create({
      model: "Meta-Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are an intelligent meal planning assistant. Create comprehensive weekly meal plans based on available ingredients, dietary preferences, family size, and seasonal produce. Focus on nutritional balance and ingredient optimization."
        },
        {
          role: "user",
          content: `Create a weekly meal plan with the following preferences:
          Family Size: ${preferences.familySize}
          Dietary Preferences: ${preferences.dietaryPreferences?.join(', ') || 'None'}
          Available Ingredients: ${preferences.availableIngredients?.join(', ') || 'None specified'}
          Health Goals: ${preferences.healthGoals?.join(', ') || 'None'}
          Budget Range: ${preferences.budgetRange}
          
          Please provide:
          1. 7-day meal plan (breakfast, lunch, dinner)
          2. Nutritional balance analysis
          3. Shopping list with quantities
          4. Ingredient optimization suggestions
          5. Seasonal adaptations`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('SambaNova API Error:', error.message);
    throw error;
  }
};

export const optimizeIngredients = async (availableIngredients, preferences) => {
  if (!sambanova) {
    throw new Error('SambaNova client is not initialized. Please check your API key.');
  }

  try {
    const completion = await sambanova.chat.completions.create({
      model: "Meta-Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are an ingredient optimization expert. Suggest recipes that maximize the use of available ingredients to minimize waste while maintaining nutritional balance."
        },
        {
          role: "user",
          content: `Available ingredients: ${availableIngredients.join(', ')}
          Dietary preferences: ${preferences.dietaryPreferences?.join(', ') || 'None'}
          Family size: ${preferences.familySize}
          
          Suggest 3-5 recipes that use these ingredients efficiently, prioritizing:
          1. Maximum ingredient utilization
          2. Nutritional balance
          3. Variety in cooking methods
          4. Minimal additional purchases needed`
        }
      ],
      temperature: 0.6,
      max_tokens: 800
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('SambaNova API Error:', error.message);
    throw error;
  }
};

export const generateSeasonalMenu = async (season, location, preferences) => {
  if (!sambanova) {
    throw new Error('SambaNova client is not initialized. Please check your API key.');
  }

  try {
    const completion = await sambanova.chat.completions.create({
      model: "Meta-Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are a seasonal cooking expert with knowledge of regional produce availability and traditional seasonal recipes."
        },
        {
          role: "user",
          content: `Create a seasonal menu for:
          Season: ${season}
          Location: ${location}
          Dietary preferences: ${preferences.dietaryPreferences?.join(', ') || 'None'}
          Family size: ${preferences.familySize}
          
          Include:
          1. Seasonal produce recommendations
          2. Traditional seasonal recipes
          3. Nutritional benefits of seasonal eating
          4. Storage and preservation tips
          5. Cost-effective seasonal shopping guide`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('SambaNova API Error:', error.message);
    throw error;
  }
};

export const generateShoppingList = async (mealPlan, familySize, preferences) => {
  if (!sambanova) {
    throw new Error('SambaNova client is not initialized. Please check your API key.');
  }

  try {
    const completion = await sambanova.chat.completions.create({
      model: "Meta-Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are a smart shopping assistant. Generate optimized shopping lists with accurate quantities based on meal plans and family size."
        },
        {
          role: "user",
          content: `Generate a shopping list for:
          Meal Plan: ${mealPlan}
          Family Size: ${familySize}
          Dietary Preferences: ${preferences.dietaryPreferences?.join(', ') || 'None'}
          
          Provide:
          1. Categorized shopping list (vegetables, grains, proteins, etc.)
          2. Optimal quantities for family size
          3. Priority items vs optional items
          4. Estimated costs
          5. Storage recommendations`
        }
      ],
      temperature: 0.5,
      max_tokens: 800
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('SambaNova API Error:', error.message);
    throw error;
  }
};
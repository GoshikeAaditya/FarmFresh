import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import ChatBot from './ChatBot';

const RecipesContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    color: ${theme.colors.primary};
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: ${theme.colors.text};
    max-width: 800px;
    margin: 0 auto;
  }
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const RecipeCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${theme.shadows.small};
`;

const RecipeInfo = styled.div`
  h3 {
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  .time {
    color: ${theme.colors.accent};
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .ingredients {
    margin: 1rem 0;
    
    h4 {
      color: ${theme.colors.text};
      margin-bottom: 0.5rem;
    }

    ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      color: ${theme.colors.lightText};
    }
  }

  .instructions {
    h4 {
      color: ${theme.colors.text};
      margin-bottom: 0.5rem;
    }

    ol {
      padding-left: 1.5rem;
      color: ${theme.colors.lightText};
    }
  }
`;

const recipes = [
  {
    id: 1,
    name: "Garden Fresh Salad",
    prepTime: "15 minutes",
    ingredients: [
      "2 cups mixed salad greens",
      "1 cucumber, sliced",
      "2 tomatoes, diced",
      "1 carrot, julienned",
      "Olive oil and lemon dressing"
    ],
    instructions: [
      "Wash and dry all vegetables",
      "Combine all ingredients in a large bowl",
      "Drizzle with olive oil and lemon juice",
      "Season with salt and pepper to taste"
    ]
  },
  {
    id: 2,
    name: "Roasted Vegetable Medley",
    prepTime: "30 minutes",
    ingredients: [
      "2 bell peppers, chopped",
      "1 zucchini, sliced",
      "2 carrots, cut into sticks",
      "1 onion, wedged",
      "Olive oil, herbs and spices"
    ],
    instructions: [
      "Preheat oven to 200°C",
      "Toss vegetables with olive oil and seasonings",
      "Spread on baking sheet",
      "Roast for 25 minutes or until tender"
    ]
  },
  {
    id: 3,
    name: "Fruit and Yogurt Parfait",
    prepTime: "10 minutes",
    ingredients: [
      "2 cups Greek yogurt",
      "1 cup mixed berries",
      "1/2 cup granola",
      "2 tablespoons honey",
      "Mint leaves for garnish"
    ],
    instructions: [
      "Layer yogurt in serving glasses",
      "Add fresh berries",
      "Top with granola",
      "Drizzle with honey and garnish with mint"
    ]
  },
  {
    id: 4,
    name: "Vegetable Stir-Fry",
    prepTime: "20 minutes",
    ingredients: [
      "2 cups mixed vegetables",
      "2 cloves garlic, minced",
      "1 inch ginger, grated",
      "Soy sauce",
      "Sesame oil"
    ],
    instructions: [
      "Heat oil in a wok or large pan",
      "Add garlic and ginger",
      "Stir-fry vegetables until crisp-tender",
      "Season with soy sauce"
    ]
  },
  {
    id: 5,
    name: "Fresh Fruit Smoothie",
    prepTime: "5 minutes",
    ingredients: [
      "1 banana",
      "1 cup mixed berries",
      "1 cup spinach",
      "1 cup almond milk",
      "1 tablespoon honey"
    ],
    instructions: [
      "Add all ingredients to blender",
      "Blend until smooth",
      "Adjust thickness with more milk if needed",
      "Serve immediately"
    ]
  }
];

function Recipes() {
  return (
    <RecipesContainer>
      <Header>
        <h1>Healthy Recipes</h1>
        <p>
          Make the most of your fresh produce with these simple and nutritious recipes.
          Each recipe is designed to highlight the natural flavors of our farm-fresh ingredients.
        </p>
      </Header>

      <RecipeGrid>
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id}>
            <RecipeInfo>
              <h3>{recipe.name}</h3>
              <p className="time">Preparation Time: {recipe.prepTime}</p>
              
              <div className="ingredients">
                <h4>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="instructions">
                <h4>Instructions:</h4>
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </RecipeInfo>
          </RecipeCard>
        ))}
      </RecipeGrid>
      <ChatBot />
    </RecipesContainer>
  );
}

export default Recipes;
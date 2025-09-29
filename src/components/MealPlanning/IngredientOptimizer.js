import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { optimizeIngredients } from '../../services/sambaNovaService';
import { useMealPlan } from '../../context/MealPlanContext';

const OptimizerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputPanel = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${theme.shadows.small};
`;

const ResultsPanel = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${theme.shadows.small};
`;

const IngredientInput = styled.div`
  margin-bottom: 2rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: ${theme.colors.text};
  }

  textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.borderRadius.small};
    min-height: 150px;
    font-size: 1rem;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
    }
  }
`;

const OptimizeButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.small};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${theme.colors.accentDark};
  }

  &:disabled {
    background: ${theme.colors.lightGray};
    cursor: not-allowed;
  }
`;

const RecipeCard = styled.div`
  background: ${theme.colors.lightBackground};
  border-radius: ${theme.borderRadius.small};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid ${theme.colors.accent};

  h4 {
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  .ingredients {
    margin-bottom: 1rem;
    
    h5 {
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
    h5 {
      color: ${theme.colors.text};
      margin-bottom: 0.5rem;
    }

    ol {
      padding-left: 1.5rem;
      color: ${theme.colors.lightText};
    }
  }
`;

function IngredientOptimizer() {
  const { preferences } = useMealPlan();
  const [availableIngredients, setAvailableIngredients] = useState('');
  const [optimizedRecipes, setOptimizedRecipes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOptimize = async () => {
    if (!availableIngredients.trim()) {
      alert('Please enter some ingredients first!');
      return;
    }

    setIsLoading(true);
    try {
      const ingredientList = availableIngredients
        .split(',')
        .map(item => item.trim())
        .filter(item => item);

      const recipes = await optimizeIngredients(ingredientList, preferences);
      setOptimizedRecipes(recipes);
    } catch (error) {
      console.error('Error optimizing ingredients:', error);
      setOptimizedRecipes('Sorry, I couldn\'t optimize your ingredients right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OptimizerContainer>
      <InputPanel>
        <h3>🥗 Ingredient Optimizer</h3>
        <p style={{ color: theme.colors.lightText, marginBottom: '2rem' }}>
          Enter the ingredients you have available, and I'll suggest recipes that maximize their use while minimizing waste.
        </p>

        <IngredientInput>
          <label>Available Ingredients</label>
          <textarea
            placeholder="Enter ingredients separated by commas (e.g., tomatoes, onions, rice, chicken, spinach, garlic...)"
            value={availableIngredients}
            onChange={(e) => setAvailableIngredients(e.target.value)}
          />
        </IngredientInput>

        <div style={{ marginBottom: '1rem' }}>
          <strong>Current Preferences:</strong>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: theme.colors.lightText }}>
            <li>Family Size: {preferences.familySize} people</li>
            <li>Dietary: {preferences.dietaryPreferences?.join(', ') || 'None specified'}</li>
            <li>Health Goals: {preferences.healthGoals?.join(', ') || 'None specified'}</li>
          </ul>
        </div>

        <OptimizeButton onClick={handleOptimize} disabled={isLoading}>
          {isLoading ? 'Optimizing Ingredients...' : 'Get Recipe Suggestions'}
        </OptimizeButton>
      </InputPanel>

      <ResultsPanel>
        <h3>📋 Optimized Recipe Suggestions</h3>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: theme.colors.lightText }}>
            🤖 Analyzing your ingredients and creating optimized recipes...
          </div>
        ) : optimizedRecipes ? (
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {optimizedRecipes}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: theme.colors.lightText }}>
            <p>Enter your available ingredients to get personalized recipe suggestions!</p>
            <p>💡 I'll help you create delicious meals while minimizing food waste.</p>
          </div>
        )}
      </ResultsPanel>
    </OptimizerContainer>
  );
}

export default IngredientOptimizer;
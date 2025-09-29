import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { generateMealPlan } from '../../services/sambaNovaService';
import { useMealPlan } from '../../context/MealPlanContext';
import { useCart } from '../../context/CartContext';

const GeneratorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PreferencesPanel = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${theme.shadows.small};
  height: fit-content;
`;

const MealPlanDisplay = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${theme.shadows.small};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: ${theme.colors.text};
  }

  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.borderRadius.small};
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;

  label {
    display: flex;
    align-items: center;
    font-weight: normal;
    margin-bottom: 0;

    input {
      width: auto;
      margin-right: 0.5rem;
    }
  }
`;

const GenerateButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.small};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }

  &:disabled {
    background: ${theme.colors.lightGray};
    cursor: not-allowed;
  }
`;

const MealPlanContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  color: ${theme.colors.text};

  h3 {
    color: ${theme.colors.primary};
    margin: 1.5rem 0 1rem 0;
  }

  h4 {
    color: ${theme.colors.accent};
    margin: 1rem 0 0.5rem 0;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: ${theme.colors.text};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: ${theme.borderRadius.small};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &.primary {
      background: ${theme.colors.primary};
      color: white;

      &:hover {
        background: ${theme.colors.primaryDark};
      }
    }

    &.secondary {
      background: ${theme.colors.lightGray};
      color: ${theme.colors.text};

      &:hover {
        background: ${theme.colors.gray};
      }
    }
  }
`;

function MealPlanGenerator() {
  const { preferences, updatePreferences, setMealPlan } = useMealPlan();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState('');

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
    'Keto', 'Paleo', 'Mediterranean', 'Low-Carb', 'High-Protein'
  ];

  const healthGoals = [
    'Weight Loss', 'Weight Gain', 'Muscle Building', 'Heart Health',
    'Diabetes Management', 'High Energy', 'Better Digestion', 'Immune Support'
  ];

  const handlePreferenceChange = (field, value) => {
    updatePreferences({ [field]: value });
  };

  const handleCheckboxChange = (field, option) => {
    const currentValues = preferences[field] || [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter(item => item !== option)
      : [...currentValues, option];
    
    updatePreferences({ [field]: newValues });
  };

  const handleGenerateMealPlan = async () => {
    setIsLoading(true);
    try {
      const plan = await generateMealPlan(preferences);
      setGeneratedPlan(plan);
      setMealPlan(plan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setGeneratedPlan('Sorry, I couldn\'t generate a meal plan right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlan = () => {
    // Save to local storage or backend
    localStorage.setItem('mealPlan', JSON.stringify({
      plan: generatedPlan,
      preferences,
      createdAt: new Date().toISOString()
    }));
    alert('Meal plan saved successfully!');
  };

  return (
    <GeneratorContainer>
      <PreferencesPanel>
        <h3>Meal Planning Preferences</h3>
        
        <FormGroup>
          <label>Family Size</label>
          <select 
            value={preferences.familySize} 
            onChange={(e) => handlePreferenceChange('familySize', parseInt(e.target.value))}
          >
            <option value={1}>1 person</option>
            <option value={2}>2 people</option>
            <option value={3}>3 people</option>
            <option value={4}>4 people</option>
            <option value={5}>5 people</option>
            <option value={6}>6+ people</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label>Dietary Preferences</label>
          <CheckboxGroup>
            {dietaryOptions.map(option => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={preferences.dietaryPreferences?.includes(option) || false}
                  onChange={() => handleCheckboxChange('dietaryPreferences', option)}
                />
                {option}
              </label>
            ))}
          </CheckboxGroup>
        </FormGroup>

        <FormGroup>
          <label>Health Goals</label>
          <CheckboxGroup>
            {healthGoals.map(goal => (
              <label key={goal}>
                <input
                  type="checkbox"
                  checked={preferences.healthGoals?.includes(goal) || false}
                  onChange={() => handleCheckboxChange('healthGoals', goal)}
                />
                {goal}
              </label>
            ))}
          </CheckboxGroup>
        </FormGroup>

        <FormGroup>
          <label>Budget Range</label>
          <select 
            value={preferences.budgetRange} 
            onChange={(e) => handlePreferenceChange('budgetRange', e.target.value)}
          >
            <option value="low">Budget-Friendly (₹200-400/day)</option>
            <option value="medium">Moderate (₹400-600/day)</option>
            <option value="high">Premium (₹600+/day)</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label>Available Ingredients (optional)</label>
          <textarea
            placeholder="List ingredients you already have at home..."
            value={preferences.availableIngredients?.join(', ') || ''}
            onChange={(e) => handlePreferenceChange('availableIngredients', 
              e.target.value.split(',').map(item => item.trim()).filter(item => item)
            )}
          />
        </FormGroup>

        <GenerateButton 
          onClick={handleGenerateMealPlan}
          disabled={isLoading}
        >
          {isLoading ? 'Generating Meal Plan...' : 'Generate Weekly Meal Plan'}
        </GenerateButton>
      </PreferencesPanel>

      <MealPlanDisplay>
        <h3>Your Weekly Meal Plan</h3>
        
        {isLoading ? (
          <LoadingSpinner>
            🤖 Creating your personalized meal plan...
          </LoadingSpinner>
        ) : generatedPlan ? (
          <>
            <MealPlanContent>{generatedPlan}</MealPlanContent>
            <ActionButtons>
              <button className="primary" onClick={handleSavePlan}>
                Save Meal Plan
              </button>
              <button className="secondary" onClick={() => setGeneratedPlan('')}>
                Clear Plan
              </button>
            </ActionButtons>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: theme.colors.lightText }}>
            <p>Set your preferences and click "Generate Weekly Meal Plan" to get started!</p>
            <p>🍽️ Our AI will create a personalized meal plan just for you.</p>
          </div>
        )}
      </MealPlanDisplay>
    </GeneratorContainer>
  );
}

export default MealPlanGenerator;
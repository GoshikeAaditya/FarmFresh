import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { generateShoppingList } from '../../services/sambaNovaService';
import { useCart } from '../../context/CartContext';
import { useMealPlan } from '../../context/MealPlanContext';

const ShoppingContainer = styled.div`
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

const ListPanel = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${theme.shadows.small};
`;

const MealPlanInput = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.small};
  font-size: 1rem;
  resize: vertical;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const GenerateButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.small};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background: ${theme.colors.accentDark};
  }

  &:disabled {
    background: ${theme.colors.lightGray};
    cursor: not-allowed;
  }
`;

const ShoppingListContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  color: ${theme.colors.text};
`;

const AddToCartButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.small};
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

function ShoppingListGenerator() {
  const { mealPlan, preferences } = useMealPlan();
  const { addToCart } = useCart();
  const [customMealPlan, setCustomMealPlan] = useState('');
  const [shoppingList, setShoppingList] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateList = async () => {
    const planToUse = customMealPlan || mealPlan;
    
    if (!planToUse) {
      alert('Please enter a meal plan or generate one first!');
      return;
    }

    setIsLoading(true);
    try {
      const list = await generateShoppingList(planToUse, preferences.familySize, preferences);
      setShoppingList(list);
    } catch (error) {
      console.error('Error generating shopping list:', error);
      setShoppingList('Sorry, I couldn\'t generate a shopping list right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    // This is a simplified version - in a real app, you'd parse the shopping list
    // and add individual items to the cart
    alert('Shopping list items would be added to cart in a real implementation!');
  };

  return (
    <ShoppingContainer>
      <InputPanel>
        <h3>🛒 Shopping List Generator</h3>
        <p style={{ color: theme.colors.lightText, marginBottom: '2rem' }}>
          Generate a smart shopping list based on your meal plan with optimal quantities.
        </p>

        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Meal Plan (or use generated plan)
        </label>
        <MealPlanInput
          placeholder="Enter your meal plan here, or leave empty to use the generated meal plan..."
          value={customMealPlan}
          onChange={(e) => setCustomMealPlan(e.target.value)}
        />

        <div style={{ marginBottom: '1rem' }}>
          <strong>Current Settings:</strong>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: theme.colors.lightText }}>
            <li>Family Size: {preferences.familySize} people</li>
            <li>Budget: {preferences.budgetRange}</li>
            <li>Dietary: {preferences.dietaryPreferences?.join(', ') || 'None'}</li>
          </ul>
        </div>

        <GenerateButton onClick={handleGenerateList} disabled={isLoading}>
          {isLoading ? 'Generating Shopping List...' : 'Generate Smart Shopping List'}
        </GenerateButton>

        {mealPlan && (
          <div style={{ padding: '1rem', background: theme.colors.lightBackground, borderRadius: theme.borderRadius.small }}>
            <strong>Using Generated Meal Plan:</strong>
            <p style={{ fontSize: '0.9rem', color: theme.colors.lightText, marginTop: '0.5rem' }}>
              {mealPlan.substring(0, 200)}...
            </p>
          </div>
        )}
      </InputPanel>

      <ListPanel>
        <h3>📋 Your Shopping List</h3>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: theme.colors.lightText }}>
            🤖 Creating your optimized shopping list...
          </div>
        ) : shoppingList ? (
          <>
            <ShoppingListContent>{shoppingList}</ShoppingListContent>
            <AddToCartButton onClick={handleAddToCart}>
              Add Items to Cart
            </AddToCartButton>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: theme.colors.lightText }}>
            <p>Generate a meal plan first, then create your shopping list!</p>
            <p>🛒 I'll calculate optimal quantities for your family size.</p>
          </div>
        )}
      </ListPanel>
    </ShoppingContainer>
  );
}

export default ShoppingListGenerator;
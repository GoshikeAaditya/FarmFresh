import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { useMealPlan } from '../../context/MealPlanContext';
import { useCart } from '../../context/CartContext';
import {
  generateMealPlan,
  optimizeIngredients,
  generateSeasonalMenu,
  calculateNutritionalBalance,
  generateShoppingList
} from '../../services/sambaNovaService';
import PreferencesForm from './PreferencesForm';
import MealPlanDisplay from './MealPlanDisplay';
import ShoppingListManager from './ShoppingListManager';
import NutritionalAnalysis from './NutritionalAnalysis';
import SeasonalRecommendations from './SeasonalRecommendations';
import IngredientOptimizer from './IngredientOptimizer';

const Container = styled.div`
  padding: 2rem;
  max-width: 1400px;
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
    font-size: 1.1rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${theme.colors.lightGray};
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: ${props => props.active ? theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : theme.colors.text};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  border-radius: ${theme.borderRadius.small} ${theme.borderRadius.small} 0 0;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? theme.colors.primary : theme.colors.lightGray};
  }
`;

const ContentArea = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${theme.shadows.medium};
  min-height: 600px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: ${theme.colors.primary};
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: ${theme.borderRadius.small};
  margin: 1rem 0;
  text-align: center;
`;

const ActionButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  margin: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:disabled {
    background: ${theme.colors.lightGray};
    cursor: not-allowed;
    transform: none;
  }
`;

function MealPlanningAgent() {
  const [activeTab, setActiveTab] = useState('preferences');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const {
    currentMealPlan,
    userPreferences,
    saveMealPlan,
    loadMealPlan,
    setNutritionalAnalysis,
    setSeasonalRecommendations
  } = useMealPlan();

  const { addToCart } = useCart();

  useEffect(() => {
    loadMealPlan();
  }, []);

  const handleGenerateMealPlan = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const mealPlanResponse = await generateMealPlan(userPreferences);
      const mealPlan = JSON.parse(mealPlanResponse);
      saveMealPlan(mealPlan);
      
      // Generate nutritional analysis
      const nutritionResponse = await calculateNutritionalBalance(mealPlan, userPreferences.healthGoals);
      setNutritionalAnalysis(JSON.parse(nutritionResponse));
      
      // Generate seasonal recommendations
      const currentSeason = getCurrentSeason();
      const seasonalResponse = await generateSeasonalMenu(currentSeason, 'India', userPreferences);
      setSeasonalRecommendations(JSON.parse(seasonalResponse));
      
      setActiveTab('mealplan');
    } catch (err) {
      setError('Failed to generate meal plan. Please try again.');
      console.error('Meal plan generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptimizeIngredients = async () => {
    if (!userPreferences.availableIngredients.length) {
      setError('Please add some available ingredients first.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const optimizedResponse = await optimizeIngredients(
        userPreferences.availableIngredients,
        userPreferences
      );
      const optimizedRecipes = JSON.parse(optimizedResponse);
      
      // Update meal plan with optimized recipes
      const updatedMealPlan = {
        ...currentMealPlan,
        optimizedRecipes
      };
      saveMealPlan(updatedMealPlan);
      setActiveTab('optimizer');
    } catch (err) {
      setError('Failed to optimize ingredients. Please try again.');
      console.error('Ingredient optimization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateShoppingList = async () => {
    if (!currentMealPlan) {
      setError('Please generate a meal plan first.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const shoppingListResponse = await generateShoppingList(
        currentMealPlan,
        userPreferences.familySize,
        userPreferences
      );
      const shoppingList = JSON.parse(shoppingListResponse);
      
      // Add items to cart context
      shoppingList.items?.forEach(item => {
        addToCart({
          id: `shopping-${Date.now()}-${Math.random()}`,
          name: item.name,
          price: item.estimatedPrice || '₹0',
          weight: item.quantity,
          category: item.category
        }, 1);
      });
      
      setActiveTab('shopping');
    } catch (err) {
      setError('Failed to generate shopping list. Please try again.');
      console.error('Shopping list generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 5) return 'Summer';
    if (month >= 6 && month <= 9) return 'Monsoon';
    return 'Winter';
  };

  const tabs = [
    { id: 'preferences', label: 'Preferences', component: PreferencesForm },
    { id: 'mealplan', label: 'Meal Plan', component: MealPlanDisplay },
    { id: 'nutrition', label: 'Nutrition', component: NutritionalAnalysis },
    { id: 'seasonal', label: 'Seasonal', component: SeasonalRecommendations },
    { id: 'optimizer', label: 'Optimizer', component: IngredientOptimizer },
    { id: 'shopping', label: 'Shopping List', component: ShoppingListManager }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <Container>
      <Header>
        <h1>Intelligent Meal Planning Agent</h1>
        <p>
          Create personalized weekly meal plans, optimize ingredients, and generate smart shopping lists 
          with AI-powered nutritional analysis and seasonal recommendations.
        </p>
      </Header>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <ActionButton 
          onClick={handleGenerateMealPlan}
          disabled={loading}
        >
          Generate Meal Plan
        </ActionButton>
        <ActionButton 
          onClick={handleOptimizeIngredients}
          disabled={loading || !userPreferences.availableIngredients.length}
        >
          Optimize Ingredients
        </ActionButton>
        <ActionButton 
          onClick={handleGenerateShoppingList}
          disabled={loading || !currentMealPlan}
        >
          Generate Shopping List
        </ActionButton>
      </div>

      <TabContainer>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabContainer>

      <ContentArea>
        {loading && (
          <LoadingSpinner>
            Generating your personalized meal plan...
          </LoadingSpinner>
        )}
        
        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}
        
        {!loading && ActiveComponent && (
          <ActiveComponent />
        )}
      </ContentArea>
    </Container>
  );
}

export default MealPlanningAgent;
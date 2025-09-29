import React, { createContext, useContext, useState } from 'react';

const MealPlanContext = createContext();

export function MealPlanProvider({ children }) {
  const [mealPlan, setMealPlan] = useState(null);
  const [preferences, setPreferences] = useState({
    familySize: 4,
    dietaryPreferences: [],
    healthGoals: [],
    budgetRange: 'medium',
    availableIngredients: []
  });
  const [shoppingList, setShoppingList] = useState([]);
  const [seasonalRecommendations, setSeasonalRecommendations] = useState(null);

  const updatePreferences = (newPreferences) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const addToShoppingList = (items) => {
    setShoppingList(prev => [...prev, ...items]);
  };

  const removeFromShoppingList = (itemId) => {
    setShoppingList(prev => prev.filter(item => item.id !== itemId));
  };

  const clearShoppingList = () => {
    setShoppingList([]);
  };

  const value = {
    mealPlan,
    setMealPlan,
    preferences,
    updatePreferences,
    shoppingList,
    addToShoppingList,
    removeFromShoppingList,
    clearShoppingList,
    seasonalRecommendations,
    setSeasonalRecommendations
  };

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  );
}

export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (!context) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
};
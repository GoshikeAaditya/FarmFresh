import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import MealPlanGenerator from './MealPlanGenerator';
import IngredientOptimizer from './IngredientOptimizer';
import SeasonalMenu from './SeasonalMenu';
import ShoppingListGenerator from './ShoppingListGenerator';
import NutritionTracker from './NutritionTracker';

const MealPlanningContainer = styled.div`
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
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.active ? theme.colors.primary : theme.colors.text};
  border-bottom: 3px solid ${props => props.active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ContentArea = styled.div`
  min-height: 600px;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${theme.shadows.small};
  text-align: center;

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    color: ${theme.colors.lightText};
  }
`;

function MealPlanning() {
  const [activeTab, setActiveTab] = useState('generator');

  const features = [
    {
      icon: '📅',
      title: 'Weekly Meal Planning',
      description: 'AI-powered meal plans based on your preferences, family size, and available ingredients'
    },
    {
      icon: '🥗',
      title: 'Ingredient Optimization',
      description: 'Smart recipe suggestions that maximize ingredient usage and minimize food waste'
    },
    {
      icon: '🌱',
      title: 'Seasonal Adaptation',
      description: 'Menu recommendations that adapt to seasonal produce availability and local ingredients'
    },
    {
      icon: '⚖️',
      title: 'Nutritional Balance',
      description: 'Ensures meal plans meet dietary requirements and health goals with balanced nutrition'
    },
    {
      icon: '🛒',
      title: 'Smart Shopping Lists',
      description: 'Automatically generated shopping lists with optimal quantities and cart integration'
    },
    {
      icon: '📊',
      title: 'Nutrition Tracking',
      description: 'Track nutritional intake and get insights on your meal planning choices'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'generator':
        return <MealPlanGenerator />;
      case 'optimizer':
        return <IngredientOptimizer />;
      case 'seasonal':
        return <SeasonalMenu />;
      case 'shopping':
        return <ShoppingListGenerator />;
      case 'nutrition':
        return <NutritionTracker />;
      default:
        return <MealPlanGenerator />;
    }
  };

  return (
    <MealPlanningContainer>
      <Header>
        <h1>Intelligent Meal Planning</h1>
        <p>
          Transform your cooking experience with AI-powered meal planning. Get personalized 
          weekly meal plans, optimize ingredient usage, and create smart shopping lists 
          tailored to your family's needs and preferences.
        </p>
      </Header>

      <FeatureGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </FeatureCard>
        ))}
      </FeatureGrid>

      <TabContainer>
        <Tab 
          active={activeTab === 'generator'} 
          onClick={() => setActiveTab('generator')}
        >
          Meal Plan Generator
        </Tab>
        <Tab 
          active={activeTab === 'optimizer'} 
          onClick={() => setActiveTab('optimizer')}
        >
          Ingredient Optimizer
        </Tab>
        <Tab 
          active={activeTab === 'seasonal'} 
          onClick={() => setActiveTab('seasonal')}
        >
          Seasonal Menu
        </Tab>
        <Tab 
          active={activeTab === 'shopping'} 
          onClick={() => setActiveTab('shopping')}
        >
          Shopping List
        </Tab>
        <Tab 
          active={activeTab === 'nutrition'} 
          onClick={() => setActiveTab('nutrition')}
        >
          Nutrition Tracker
        </Tab>
      </TabContainer>

      <ContentArea>
        {renderTabContent()}
      </ContentArea>
    </MealPlanningContainer>
  );
}

export default MealPlanning;
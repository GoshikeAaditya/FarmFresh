import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { useMealPlan } from '../../context/MealPlanContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SeasonCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${theme.shadows.small};
`;

const SeasonHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  
  h2 {
    color: ${theme.colors.primary};
    font-size: 1.8rem;
    margin: 0;
  }
  
  .season-icon {
    font-size: 2rem;
  }
`;

const ProduceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ProduceItem = styled.div`
  background: ${theme.colors.lightGray};
  padding: 1.5rem;
  border-radius: ${theme.borderRadius.medium};
  text-align: center;
  
  h4 {
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${theme.colors.text};
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .benefits {
    color: ${theme.colors.lightText};
    font-size: 0.8rem;
    font-style: italic;
  }
`;

const RecipeSection = styled.div`
  margin-bottom: 2rem;
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const RecipeCard = styled.div`
  background: ${theme.colors.lightGray};
  padding: 1.5rem;
  border-radius: ${theme.borderRadius.medium};
  
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
      color: ${theme.colors.lightText};
      font-size: 0.9rem;
      padding-left: 1.5rem;
    }
  }
  
  .instructions {
    color: ${theme.colors.text};
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const TipsSection = styled.div`
  background: ${theme.colors.lightGray};
  padding: 1.5rem;
  border-radius: ${theme.borderRadius.medium};
  margin-top: 2rem;
  
  h4 {
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }
  
  ul {
    color: ${theme.colors.text};
    line-height: 1.6;
    padding-left: 1.5rem;
  }
`;

function SeasonalRecommendations() {
  const { seasonalRecommendations } = useMealPlan();
  
  if (!seasonalRecommendations) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '3rem', color: theme.colors.lightText }}>
          <h3>🌱 Seasonal Recommendations</h3>
          <p>Generate a meal plan to see seasonal produce recommendations and recipes!</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <SeasonCard>
        <SeasonHeader>
          <h2>🌱 Seasonal Recommendations</h2>
          <div className="season-icon">🍂</div>
        </SeasonHeader>
        
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: theme.colors.text }}>
          {seasonalRecommendations}
        </div>
        
        <TipsSection>
          <h4>💡 Seasonal Eating Tips</h4>
          <ul>
            <li>Choose locally grown produce for better taste and nutrition</li>
            <li>Seasonal ingredients are typically more affordable</li>
            <li>Plan meals around what's in season for variety</li>
            <li>Preserve seasonal produce for year-round enjoyment</li>
          </ul>
        </TipsSection>
      </SeasonCard>
    </Container>
  );
}

export default SeasonalRecommendations;
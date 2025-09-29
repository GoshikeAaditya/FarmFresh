import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { useMealPlan } from '../../context/MealPlanContext';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const AnalysisCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${theme.shadows.small};
`;

const CardTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`;

const MacroGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MacroItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.medium};
`;

const MacroValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const MacroLabel = styled.div`
  color: ${theme.colors.text};
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: ${theme.colors.lightGray};
  border-radius: 10px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.color || theme.colors.primary};
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const VitaminGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const VitaminItem = styled.div`
  text-align: center;
  padding: 1rem;
  border: 2px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.small};
  
  h4 {
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${theme.colors.text};
    font-size: 0.9rem;
  }
`;

const RecommendationList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background: ${theme.colors.lightGray};
    border-radius: ${theme.borderRadius.small};
    border-left: 4px solid ${theme.colors.primary};
    color: ${theme.colors.text};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${theme.colors.lightText};
  
  h3 {
    color: ${theme.colors.text};
    margin-bottom: 1rem;
  }
`;

function NutritionalAnalysis() {
  const { nutritionalAnalysis, currentMealPlan } = useMealPlan();

  // Mock nutritional data if none exists
  const mockNutrition = {
    dailyAverages: {
      calories: 2200,
      protein: 85,
      carbohydrates: 275,
      fat: 73,
      fiber: 35,
      sugar: 45
    },
    macroPercentages: {
      protein: 15,
      carbohydrates: 50,
      fat: 30,
      fiber: 5
    },
    vitamins: {
      'Vitamin A': '120%',
      'Vitamin C': '200%',
      'Vitamin D': '80%',
      'Vitamin E': '95%',
      'B Vitamins': '110%',
      'Folate': '85%'
    },
    minerals: {
      'Iron': '90%',
      'Calcium': '105%',
      'Potassium': '115%',
      'Magnesium': '88%',
      'Zinc': '92%',
      'Phosphorus': '98%'
    },
    recommendations: [
      'Increase iron-rich foods like spinach and lentils',
      'Add more vitamin D sources or consider supplementation',
      'Include more omega-3 rich foods like walnuts and flaxseeds',
      'Maintain current fiber intake for digestive health',
      'Consider reducing added sugars in snacks'
    ],
    healthScore: 85
  };

  const displayData = nutritionalAnalysis || mockNutrition;

  if (!currentMealPlan && !nutritionalAnalysis) {
    return (
      <EmptyState>
        <h3>No Nutritional Analysis Available</h3>
        <p>Generate a meal plan first to see detailed nutritional analysis.</p>
      </EmptyState>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  return (
    <Container>
      <AnalysisCard>
        <CardTitle>Daily Nutritional Overview</CardTitle>
        <MacroGrid>
          <MacroItem>
            <MacroValue>{displayData.dailyAverages?.calories || 2200}</MacroValue>
            <MacroLabel>Calories</MacroLabel>
          </MacroItem>
          <MacroItem>
            <MacroValue>{displayData.dailyAverages?.protein || 85}g</MacroValue>
            <MacroLabel>Protein</MacroLabel>
          </MacroItem>
          <MacroItem>
            <MacroValue>{displayData.dailyAverages?.carbohydrates || 275}g</MacroValue>
            <MacroLabel>Carbohydrates</MacroLabel>
          </MacroItem>
          <MacroItem>
            <MacroValue>{displayData.dailyAverages?.fat || 73}g</MacroValue>
            <MacroLabel>Healthy Fats</MacroLabel>
          </MacroItem>
        </MacroGrid>
      </AnalysisCard>

      <AnalysisCard>
        <CardTitle>Macronutrient Balance</CardTitle>
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Protein</span>
              <span>{displayData.macroPercentages?.protein || 15}%</span>
            </div>
            <ProgressBar>
              <ProgressFill percentage={displayData.macroPercentages?.protein || 15} color="#28a745" />
            </ProgressBar>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Carbohydrates</span>
              <span>{displayData.macroPercentages?.carbohydrates || 50}%</span>
            </div>
            <ProgressBar>
              <ProgressFill percentage={displayData.macroPercentages?.carbohydrates || 50} color="#007bff" />
            </ProgressBar>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Fats</span>
              <span>{displayData.macroPercentages?.fat || 30}%</span>
            </div>
            <ProgressBar>
              <ProgressFill percentage={displayData.macroPercentages?.fat || 30} color="#ffc107" />
            </ProgressBar>
          </div>
        </div>
      </AnalysisCard>

      <AnalysisCard>
        <CardTitle>Vitamin Content (% Daily Value)</CardTitle>
        <VitaminGrid>
          {Object.entries(displayData.vitamins || {}).map(([vitamin, percentage]) => (
            <VitaminItem key={vitamin}>
              <h4>{vitamin}</h4>
              <p>{percentage}</p>
            </VitaminItem>
          ))}
        </VitaminGrid>
      </AnalysisCard>

      <AnalysisCard>
        <CardTitle>Mineral Content (% Daily Value)</CardTitle>
        <VitaminGrid>
          {Object.entries(displayData.minerals || {}).map(([mineral, percentage]) => (
            <VitaminItem key={mineral}>
              <h4>{mineral}</h4>
              <p>{percentage}</p>
            </VitaminItem>
          ))}
        </VitaminGrid>
      </AnalysisCard>

      <AnalysisCard>
        <CardTitle>Health Score & Recommendations</CardTitle>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: getScoreColor(displayData.healthScore || 85),
            marginBottom: '0.5rem'
          }}>
            {displayData.healthScore || 85}/100
          </div>
          <p style={{ color: theme.colors.text }}>Overall Health Score</p>
        </div>
        
        <RecommendationList>
          {(displayData.recommendations || []).map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </RecommendationList>
      </AnalysisCard>
    </Container>
  );
}

export default NutritionalAnalysis;
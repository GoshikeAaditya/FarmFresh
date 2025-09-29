import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

const TrackerContainer = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${theme.shadows.small};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: ${theme.colors.lightBackground};
  padding: 1.5rem;
  border-radius: ${theme.borderRadius.small};
  text-align: center;
  border-left: 4px solid ${props => props.color || theme.colors.primary};

  .value {
    font-size: 2rem;
    font-weight: bold;
    color: ${props => props.color || theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  .label {
    color: ${theme.colors.text};
    font-weight: 500;
  }

  .unit {
    color: ${theme.colors.lightText};
    font-size: 0.9rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${theme.colors.lightGray};
  border-radius: 4px;
  margin-top: 0.5rem;
  overflow: hidden;

  .fill {
    height: 100%;
    background: ${props => props.color || theme.colors.primary};
    width: ${props => Math.min(props.percentage || 0, 100)}%;
    transition: width 0.3s ease;
  }
`;

const RecommendationCard = styled.div`
  background: ${theme.colors.lightBackground};
  padding: 1.5rem;
  border-radius: ${theme.borderRadius.small};
  margin-bottom: 1rem;
  border-left: 4px solid ${theme.colors.accent};

  h4 {
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    color: ${theme.colors.text};

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

function NutritionTracker() {
  // Mock data - in a real app, this would come from meal plan analysis
  const [nutritionData] = useState({
    calories: { current: 1850, target: 2000, unit: 'kcal' },
    protein: { current: 75, target: 80, unit: 'g' },
    carbs: { current: 220, target: 250, unit: 'g' },
    fat: { current: 65, target: 70, unit: 'g' },
    fiber: { current: 28, target: 35, unit: 'g' },
    vitamins: { current: 85, target: 100, unit: '%' }
  });

  const getColor = (key) => {
    const colors = {
      calories: '#FF6B6B',
      protein: '#4ECDC4',
      carbs: '#45B7D1',
      fat: '#96CEB4',
      fiber: '#FFEAA7',
      vitamins: '#DDA0DD'
    };
    return colors[key] || theme.colors.primary;
  };

  const getPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const recommendations = [
    {
      title: "Increase Fiber Intake",
      suggestions: [
        "Add more whole grains to your meals",
        "Include more vegetables in your diet",
        "Choose fruits with skin when possible",
        "Add legumes and beans to your meals"
      ]
    },
    {
      title: "Optimize Protein Distribution",
      suggestions: [
        "Include protein in every meal",
        "Add Greek yogurt or nuts as snacks",
        "Consider plant-based protein sources",
        "Balance animal and plant proteins"
      ]
    },
    {
      title: "Vitamin Enhancement",
      suggestions: [
        "Include more colorful vegetables",
        "Add citrus fruits for Vitamin C",
        "Include leafy greens for folate",
        "Consider fortified foods for B12"
      ]
    }
  ];

  return (
    <TrackerContainer>
      <h3>📊 Nutrition Tracker</h3>
      <p style={{ color: theme.colors.lightText, marginBottom: '2rem' }}>
        Track your nutritional intake and get personalized recommendations based on your meal plans.
      </p>

      <StatsGrid>
        {Object.entries(nutritionData).map(([key, data]) => (
          <StatCard key={key} color={getColor(key)}>
            <div className="value">{data.current}</div>
            <div className="label">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
            <div className="unit">of {data.target} {data.unit}</div>
            <ProgressBar color={getColor(key)} percentage={getPercentage(data.current, data.target)}>
              <div className="fill"></div>
            </ProgressBar>
          </StatCard>
        ))}
      </StatsGrid>

      <h4 style={{ color: theme.colors.primary, marginBottom: '1rem' }}>
        💡 Personalized Recommendations
      </h4>

      {recommendations.map((rec, index) => (
        <RecommendationCard key={index}>
          <h4>{rec.title}</h4>
          <ul>
            {rec.suggestions.map((suggestion, idx) => (
              <li key={idx}>{suggestion}</li>
            ))}
          </ul>
        </RecommendationCard>
      ))}

      <div style={{ 
        background: theme.colors.lightBackground, 
        padding: '1rem', 
        borderRadius: theme.borderRadius.small,
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ color: theme.colors.lightText }}>
          💡 <strong>Tip:</strong> Generate meal plans to get real-time nutrition analysis and personalized recommendations!
        </p>
      </div>
    </TrackerContainer>
  );
}

export default NutritionTracker;
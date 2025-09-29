import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { useMealPlan } from '../../context/MealPlanContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DayCard = styled.div`
  background: white;
  border: 2px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.medium};
  padding: 1rem;
  box-shadow: ${theme.shadows.small};
`;

const DayHeader = styled.h3`
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const MealSection = styled.div`
  margin-bottom: 1rem;
  
  h4 {
    color: ${theme.colors.text};
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-weight: 600;
  }
  
  p {
    color: ${theme.colors.lightText};
    font-size: 0.85rem;
    line-height: 1.4;
    margin-bottom: 0.25rem;
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
  
  p {
    margin-bottom: 2rem;
  }
`;

const GenerateButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const SummaryCard = styled.div`
  background: ${theme.colors.lightGray};
  padding: 1.5rem;
  border-radius: ${theme.borderRadius.medium};
  margin-bottom: 2rem;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SummaryItem = styled.div`
  text-align: center;
  
  h4 {
    color: ${theme.colors.primary};
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${theme.colors.text};
    font-size: 0.9rem;
  }
`;

function MealPlanDisplay() {
  const { currentMealPlan } = useMealPlan();

  if (!currentMealPlan) {
    return (
      <EmptyState>
        <h3>No Meal Plan Generated</h3>
        <p>Create your personalized weekly meal plan by setting your preferences and clicking "Generate Meal Plan".</p>
        <GenerateButton onClick={() => window.location.reload()}>
          Get Started
        </GenerateButton>
      </EmptyState>
    );
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Container>
      {currentMealPlan.summary && (
        <SummaryCard>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: theme.colors.primary }}>
            Weekly Summary
          </h3>
          <SummaryGrid>
            <SummaryItem>
              <h4>{currentMealPlan.summary.totalCalories || 'N/A'}</h4>
              <p>Total Calories/Day</p>
            </SummaryItem>
            <SummaryItem>
              <h4>{currentMealPlan.summary.proteinPercentage || 'N/A'}%</h4>
              <p>Protein</p>
            </SummaryItem>
            <SummaryItem>
              <h4>{currentMealPlan.summary.carbPercentage || 'N/A'}%</h4>
              <p>Carbohydrates</p>
            </SummaryItem>
            <SummaryItem>
              <h4>{currentMealPlan.summary.fatPercentage || 'N/A'}%</h4>
              <p>Healthy Fats</p>
            </SummaryItem>
          </SummaryGrid>
        </SummaryCard>
      )}

      <WeekGrid>
        {days.map(day => {
          const dayPlan = currentMealPlan.weeklyPlan?.[day.toLowerCase()] || currentMealPlan[day.toLowerCase()];
          
          return (
            <DayCard key={day}>
              <DayHeader>{day}</DayHeader>
              
              <MealSection>
                <h4>Breakfast</h4>
                <p>{dayPlan?.breakfast || 'Not planned'}</p>
              </MealSection>
              
              <MealSection>
                <h4>Lunch</h4>
                <p>{dayPlan?.lunch || 'Not planned'}</p>
              </MealSection>
              
              <MealSection>
                <h4>Dinner</h4>
                <p>{dayPlan?.dinner || 'Not planned'}</p>
              </MealSection>
              
              {dayPlan?.snack && (
                <MealSection>
                  <h4>Snack</h4>
                  <p>{dayPlan.snack}</p>
                </MealSection>
              )}
            </DayCard>
          );
        })}
      </WeekGrid>

      {currentMealPlan.tips && (
        <SummaryCard>
          <h3 style={{ color: theme.colors.primary, marginBottom: '1rem' }}>
            Meal Planning Tips
          </h3>
          <ul style={{ color: theme.colors.text, lineHeight: 1.6 }}>
            {currentMealPlan.tips.map((tip, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>{tip}</li>
            ))}
          </ul>
        </SummaryCard>
      )}
    </Container>
  );
}

export default MealPlanDisplay;
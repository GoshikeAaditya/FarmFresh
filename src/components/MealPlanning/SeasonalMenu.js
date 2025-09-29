import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { generateSeasonalMenu } from '../../services/sambaNovaService';

const SeasonalContainer = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${theme.shadows.small};
`;

const SeasonSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SeasonCard = styled.div`
  padding: 1.5rem;
  border: 2px solid ${props => props.selected ? theme.colors.primary : theme.colors.lightGray};
  border-radius: ${theme.borderRadius.small};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  h4 {
    color: ${theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${theme.colors.lightText};
    font-size: 0.9rem;
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
  margin-bottom: 2rem;

  &:hover {
    background: ${theme.colors.primaryDark};
  }

  &:disabled {
    background: ${theme.colors.lightGray};
    cursor: not-allowed;
  }
`;

const MenuContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  color: ${theme.colors.text};
`;

function SeasonalMenu() {
  const [selectedSeason, setSelectedSeason] = useState('');
  const [seasonalMenu, setSeasonalMenu] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const seasons = [
    { id: 'spring', name: 'Spring', icon: '🌸', description: 'Fresh greens and early vegetables' },
    { id: 'summer', name: 'Summer', icon: '☀️', description: 'Abundant fruits and vegetables' },
    { id: 'monsoon', name: 'Monsoon', icon: '🌧️', description: 'Seasonal comfort foods' },
    { id: 'winter', name: 'Winter', icon: '❄️', description: 'Hearty and warming dishes' }
  ];

  const handleGenerateMenu = async () => {
    if (!selectedSeason) {
      alert('Please select a season first!');
      return;
    }

    setIsLoading(true);
    try {
      const menu = await generateSeasonalMenu(selectedSeason, 'India', {
        dietaryPreferences: [],
        familySize: 4
      });
      setSeasonalMenu(menu);
    } catch (error) {
      console.error('Error generating seasonal menu:', error);
      setSeasonalMenu('Sorry, I couldn\'t generate a seasonal menu right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SeasonalContainer>
      <h3>🌱 Seasonal Menu Recommendations</h3>
      <p style={{ color: theme.colors.lightText, marginBottom: '2rem' }}>
        Get menu suggestions based on seasonal produce availability and traditional recipes.
      </p>

      <SeasonSelector>
        {seasons.map(season => (
          <SeasonCard
            key={season.id}
            selected={selectedSeason === season.id}
            onClick={() => setSelectedSeason(season.id)}
          >
            <div className="icon">{season.icon}</div>
            <h4>{season.name}</h4>
            <p>{season.description}</p>
          </SeasonCard>
        ))}
      </SeasonSelector>

      <GenerateButton onClick={handleGenerateMenu} disabled={isLoading || !selectedSeason}>
        {isLoading ? 'Generating Seasonal Menu...' : 'Get Seasonal Recommendations'}
      </GenerateButton>

      {seasonalMenu && (
        <MenuContent>{seasonalMenu}</MenuContent>
      )}
    </SeasonalContainer>
  );
}

export default SeasonalMenu;
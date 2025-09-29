import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { useMealPlan } from '../../context/MealPlanContext';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.medium};
`;

const SectionTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.small};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.small};
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  input {
    margin-right: 0.5rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.small};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SaveButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const IngredientTag = styled.span`
  display: inline-block;
  background: ${theme.colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: ${theme.borderRadius.small};
  margin: 0.25rem;
  font-size: 0.9rem;
  
  button {
    background: none;
    border: none;
    color: white;
    margin-left: 0.5rem;
    cursor: pointer;
    font-weight: bold;
  }
`;

function PreferencesForm() {
  const { userPreferences, updatePreferences } = useMealPlan();
  const [formData, setFormData] = useState(userPreferences);
  const [newIngredient, setNewIngredient] = useState('');

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 
    'Paleo', 'Low-Carb', 'High-Protein', 'Mediterranean', 'Indian Traditional'
  ];

  const healthGoalOptions = [
    'Weight Loss', 'Weight Gain', 'Muscle Building', 'Heart Health',
    'Diabetes Management', 'Lower Cholesterol', 'Digestive Health',
    'Energy Boost', 'Immune Support', 'General Wellness'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field, option) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(option)
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option]
    }));
  };

  const addIngredient = () => {
    if (newIngredient.trim() && !formData.availableIngredients.includes(newIngredient.trim())) {
      setFormData(prev => ({
        ...prev,
        availableIngredients: [...prev.availableIngredients, newIngredient.trim()]
      }));
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient) => {
    setFormData(prev => ({
      ...prev,
      availableIngredients: prev.availableIngredients.filter(item => item !== ingredient)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePreferences(formData);
    alert('Preferences saved successfully!');
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Basic Information</SectionTitle>
          
          <FormGroup>
            <Label>Family Size</Label>
            <Select
              value={formData.familySize}
              onChange={(e) => handleInputChange('familySize', parseInt(e.target.value))}
            >
              <option value={1}>1 person</option>
              <option value={2}>2 people</option>
              <option value={3}>3 people</option>
              <option value={4}>4 people</option>
              <option value={5}>5 people</option>
              <option value={6}>6+ people</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Budget Range</Label>
            <Select
              value={formData.budgetRange}
              onChange={(e) => handleInputChange('budgetRange', e.target.value)}
            >
              <option value="low">Budget-Friendly (₹200-400/day)</option>
              <option value="medium">Moderate (₹400-800/day)</option>
              <option value="high">Premium (₹800+/day)</option>
            </Select>
          </FormGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Dietary Preferences</SectionTitle>
          <CheckboxGroup>
            {dietaryOptions.map(option => (
              <CheckboxItem key={option}>
                <input
                  type="checkbox"
                  checked={formData.dietaryPreferences.includes(option)}
                  onChange={() => handleCheckboxChange('dietaryPreferences', option)}
                />
                {option}
              </CheckboxItem>
            ))}
          </CheckboxGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Health Goals</SectionTitle>
          <CheckboxGroup>
            {healthGoalOptions.map(option => (
              <CheckboxItem key={option}>
                <input
                  type="checkbox"
                  checked={formData.healthGoals.includes(option)}
                  onChange={() => handleCheckboxChange('healthGoals', option)}
                />
                {option}
              </CheckboxItem>
            ))}
          </CheckboxGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Available Ingredients</SectionTitle>
          <FormGroup>
            <Label>Add ingredients you currently have</Label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <Input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Enter ingredient name"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
              />
              <button
                type="button"
                onClick={addIngredient}
                style={{
                  background: theme.colors.primary,
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: theme.borderRadius.small,
                  cursor: 'pointer'
                }}
              >
                Add
              </button>
            </div>
            
            <div>
              {formData.availableIngredients.map(ingredient => (
                <IngredientTag key={ingredient}>
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    ×
                  </button>
                </IngredientTag>
              ))}
            </div>
          </FormGroup>
        </FormSection>

        <SaveButton type="submit">
          Save Preferences
        </SaveButton>
      </form>
    </FormContainer>
  );
}

export default PreferencesForm;
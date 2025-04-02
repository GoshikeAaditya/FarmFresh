import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const QuantityButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.small};
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  padding: 0 0.5rem;
  min-width: 40px;
  text-align: center;
`;

function QuantitySelector({ quantity, onChange, min = 1, max = 10 }) {
  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <Container onClick={e => e.stopPropagation()}>
      <QuantityButton 
        onClick={handleDecrease}
        disabled={quantity <= min}
      >
        -
      </QuantityButton>
      <QuantityDisplay>{quantity}</QuantityDisplay>
      <QuantityButton 
        onClick={handleIncrease}
        disabled={quantity >= max}
      >
        +
      </QuantityButton>
    </Container>
  );
}

export default QuantitySelector;
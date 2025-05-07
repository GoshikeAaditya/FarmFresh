import styled from 'styled-components';
import { theme } from '../../theme/theme';

const Button = styled.button`
  background-color: ${props => props.variant === 'secondary' ? theme.colors.secondary : theme.colors.primary};
  color: ${theme.colors.white};
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: ${theme.borderRadius.medium};
  font-family: ${theme.fonts.primary};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: ${theme.shadows.small};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }

  &:active {
    transform: translateY(0);
  }
`;

export default Button;
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../theme/theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.fullScreen ? '80vh' : '200px'};
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid ${theme.colors.background};
  border-top: 5px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

function LoadingSpinner({ fullScreen }) {
  return (
    <SpinnerContainer fullScreen={fullScreen}>
      <Spinner />
    </SpinnerContainer>
  );
}

export default LoadingSpinner;
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../theme/theme';
import Button from '../common/Button';

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const LoginContainer = styled.div`
  display: flex;
  min-height: 80vh;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
`;

const LoginForm = styled.div`
  width: 100%;
  max-width: 450px;
  margin: auto;
  padding: 2rem;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.large};
  animation: ${slideIn} 0.6s ease-out;
`;

const FormTitle = styled.h2`
  font-family: ${theme.fonts.primary};
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.secondary};
  color: ${theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid ${props => props.error ? theme.colors.error : '#e0e0e0'};
  border-radius: ${theme.borderRadius.small};
  font-family: ${theme.fonts.secondary};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: 0.85rem;
  margin-top: 0.3rem;
  display: block;
`;

const SocialLogin = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const SocialButton = styled(Button)`
  width: 100%;
  margin: 0.5rem 0;
  background: ${props => props.variant === 'google' ? '#DB4437' : '#3b5998'};
`;

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <LoginContainer>
      <LoginForm>
        <FormTitle>Welcome Back</FormTitle>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Enter your email"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter your password"
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <Button type="submit" style={{ width: '100%' }}>
            Login
          </Button>
        </form>

        <SocialLogin>
          <p>Or continue with</p>
          <SocialButton variant="google">
            Continue with Google
          </SocialButton>
          <SocialButton variant="facebook">
            Continue with Facebook
          </SocialButton>
        </SocialLogin>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
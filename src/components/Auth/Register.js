import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

const RegisterContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const RegisterCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.medium};
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${theme.colors.disabled};
  border-radius: ${theme.borderRadius.small};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.small};
  font-size: 1rem;
  cursor: pointer;
  
  &:disabled {
    background-color: ${theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  text-align: center;
  margin-top: 1rem;
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const success = await register(formData);
    if (success) {
      navigate('/');
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Title>Create Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Register'}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
        <LoginLink>
          Already have an account? <Link to="/login">Login here</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
}

export default Register;
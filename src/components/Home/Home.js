import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

const HeroSection = styled.div`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-family: ${theme.fonts.primary};
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-family: ${theme.fonts.secondary};
`;

const ShopNowButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.buttonHover};
  }
`;

const Section = styled.section`
  padding: 5rem 2rem;
  text-align: center;
`;

const FeaturesSection = styled(Section)`
  background-color: ${theme.colors.background};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Feature = styled.div`
  padding: 2rem;
  background: white;
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.small};

  h3 {
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    color: ${theme.colors.text};
  }
`;

const AboutSection = styled(Section)`
  background-color: #f9f9f9;
  
  h2 {
    color: ${theme.colors.primary};
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  p {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
    color: ${theme.colors.text};
  }
`;

function Home() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  return (
    <>
      <HeroSection>
        <HeroTitle>Welcome to FarmFresh</HeroTitle>
        <HeroSubtitle>Farm to Table Fresh Produce Delivered to Your Doorstep</HeroSubtitle>
        <ShopNowButton onClick={handleShopNow}>
          Shop Now
        </ShopNowButton>
      </HeroSection>

      <FeaturesSection>
        <Feature>
          <h3>Fresh & Organic</h3>
          <p>Handpicked fresh produce directly from local farmers</p>
        </Feature>
        <Feature>
          <h3>Fast Delivery</h3>
          <p>Same day delivery to ensure maximum freshness</p>
        </Feature>
        <Feature>
          <h3>Best Prices</h3>
          <p>Fair prices for both farmers and customers</p>
        </Feature>
      </FeaturesSection>

      <AboutSection>
        <h2>Our Story</h2>
        <p>
          FarmFresh connects local farmers directly with consumers, ensuring you get the 
          freshest produce while supporting local agriculture. We believe in sustainable 
          farming practices and reducing food waste through our Ugly Produce initiative.
        </p>
        <br />

        <p>Contact us:
          <br />
          Aaditya: Ph. No: 9347265490
          <br/>
          Benarjee: Ph. No: 6303092654
          <br/>
        </p>
      </AboutSection>
    </>
  );
}

export default Home;
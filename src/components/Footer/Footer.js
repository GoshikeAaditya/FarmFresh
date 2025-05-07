import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-family: ${theme.fonts.primary};
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: ${theme.colors.white};
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    font-size: 1.5rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>FarmFresh</h3>
          <p>Connecting farmers with consumers for a sustainable future.</p>
          <SocialLinks>
            <a href="#">📱</a>
            <a href="#">📘</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Our Products</Link></li>
            <li><Link to="/farmers">Meet Our Farmers</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Customer Service</h3>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping Information</Link></li>
            <li><Link to="/returns">Returns Policy</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Newsletter</h3>
          <p>Subscribe to get special offers, free giveaways, and updates!</p>
          <form>
            <input 
              type="email" 
              placeholder="Enter your email"
              style={{
                padding: '0.8rem',
                width: '100%',
                marginTop: '1rem',
                borderRadius: theme.borderRadius.small,
                border: 'none'
              }}
            />
          </form>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} FarmFresh. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;
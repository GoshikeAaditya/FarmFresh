import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Nav = styled.nav`
  background-color: ${theme.colors.primary};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 2rem;
    box-shadow: ${theme.shadows.medium};
    z-index: 1000;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.accent};
  }

  &.active {
    color: ${theme.colors.accent};
  }

  @media (max-width: 768px) {
    color: ${theme.colors.text};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

const CartIcon = styled(NavLink)`
  position: relative;
  padding: 0 0.5rem;
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${theme.colors.accent};
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
  min-width: 20px;
  text-align: center;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;

  @media (max-width: 768px) {
    color: ${theme.colors.text};
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 500;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    color: ${theme.colors.text};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Navbar() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <Nav>
      <Container>
        <Logo to="/">
          <span>🌱</span>
          FarmFresh
        </Logo>
        
        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </MobileMenuButton>
        
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setIsMenuOpen(false)}>Products</NavLink>
          <NavLink to="/farmers" onClick={() => setIsMenuOpen(false)}>Farmers</NavLink>
          <NavLink to="/recipes" onClick={() => setIsMenuOpen(false)}>Recipes</NavLink>
          <NavLink to="/meal-planning" onClick={() => setIsMenuOpen(false)}>Meal Planning</NavLink>
          <NavLink to="/ugly-produce" onClick={() => setIsMenuOpen(false)}>Ugly Produce</NavLink>
          <CartIcon to="/cart" onClick={() => setIsMenuOpen(false)}>
            🛒 Cart
            {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </CartIcon>
          {user ? (
            <UserSection>
              <span>Welcome, {user.name}</span>
              <LogoutButton onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</LogoutButton>
            </UserSection>
          ) : (
            <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
          )}
        </NavLinks>
      </Container>
    </Nav>
  );
}

export default Navbar;
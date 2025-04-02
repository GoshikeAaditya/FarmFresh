import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import CartDropdown from '../Cart/CartDropdown';

const Nav = styled.nav`
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadows.medium};
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: ${theme.fonts.primary};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: '🌱';
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  a {
    font-family: ${theme.fonts.secondary};
    color: ${theme.colors.text};
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: ${theme.borderRadius.small};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${theme.colors.background};
      color: ${theme.colors.primary};
    }
  }
`;

const CartIcon = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0.5rem;

  &:after {
    content: '${props => props.itemCount}';
    position: absolute;
    top: -5px;
    right: -5px;
    background: ${theme.colors.accent};
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
  }
`;

const CartContainer = styled.div`
  position: relative;
`;

function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const cartItems = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 40,
      quantity: 2,
      image: 'https://example.com/tomato.jpg'
    }
  ];

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">FarmFresh</Logo>
        <NavList>
          <NavItem><Link to="/">Home</Link></NavItem>
          <NavItem><Link to="/products">Products</Link></NavItem>
          <NavItem><Link to="/farmers">Farmers</Link></NavItem>
          <NavItem><Link to="/ugly-produce">Ugly Produce</Link></NavItem>
          <NavItem><Link to="/recipes">Recipes</Link></NavItem>
          <NavItem>
            <CartContainer>
              <CartIcon 
                itemCount={cartItems.length}
                onClick={() => setShowCart(!showCart)}
              >
                🛒
              </CartIcon>
              {showCart && (
                <CartDropdown 
                  items={cartItems} 
                  onClose={() => setShowCart(false)}
                />
              )}
            </CartContainer>
          </NavItem>
        </NavList>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
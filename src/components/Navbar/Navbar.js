import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Nav = styled.nav`
  background-color: ${theme.colors.primary};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
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
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  height: 100%;
  
  &:hover {
    text-decoration: underline;
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
`;

function Navbar() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const { user, logout } = useAuth();
  
  return (
    <Nav>
      <NavContainer>
        <Logo to="/">FarmFresh</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/farmers">Farmers</NavLink>
          <NavLink to="/ugly-produce">Ugly Produce</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          <CartIcon to="/cart">
            Cart
            {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </CartIcon>
          {user ? (
            <UserSection>
              <span>Welcome, {user.name}</span>
              <LogoutButton onClick={logout}>Logout</LogoutButton>
            </UserSection>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
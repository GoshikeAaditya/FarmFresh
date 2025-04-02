import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import Button from '../common/Button';

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.large};
  padding: 1rem;
  z-index: 1000;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: ${theme.borderRadius.small};
    margin-right: 1rem;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  h4 {
    margin: 0;
    font-size: 0.9rem;
  }
  p {
    margin: 0;
    color: ${theme.colors.primary};
    font-weight: bold;
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  font-weight: bold;
`;

function CartDropdown({ items = [], onClose }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Dropdown>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map(item => (
            <CartItem key={item.id}>
              <img src={item.image} alt={item.name} />
              <ItemInfo>
                <h4>{item.name}</h4>
                <p>₹{item.price} × {item.quantity}</p>
              </ItemInfo>
            </CartItem>
          ))}
          <Total>
            <span>Total:</span>
            <span>₹{total}</span>
          </Total>
          <Button style={{ width: '100%' }}>Checkout</Button>
        </>
      )}
    </Dropdown>
  );
}

export default CartDropdown;
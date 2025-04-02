import React from 'react';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';
import { theme } from '../../theme/theme';
import QuantitySelector from '../common/QuantitySelector';

const CartContainer = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const CartHeader = styled.h1`
  text-align: center;
  color: ${theme.colors.primary};
  margin-bottom: 2rem;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${theme.colors.lightText};
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid ${theme.colors.disabled};
  border-radius: ${theme.borderRadius.medium};
  margin-bottom: 1rem;
  background: white;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.small};
`;

const ItemInfo = styled.div`
  flex: 1;
  padding: 0 1.5rem;

  h3 {
    margin: 0 0 0.5rem;
    color: ${theme.colors.text};
  }

  p {
    margin: 0.3rem 0;
    color: ${theme.colors.lightText};
  }
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
`;

const PriceInfo = styled.div`
  text-align: right;
  
  .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${theme.colors.primary};
  }
`;

const CartSummary = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid ${theme.colors.disabled};
  border-radius: ${theme.borderRadius.medium};
  background: white;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CheckoutButton = styled(Button)`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
`;

const RemoveButton = styled(Button)`
  background-color: ${theme.colors.error};
  color: white;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  width: 120px;

  &:hover {
    background-color: ${theme.colors.errorDark};
  }
`;

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  // Update the cartTotal calculation
  const cartTotal = cart.reduce((total, item) => {
  // Remove ₹ symbol and convert to number
  const price = parseFloat(item.price.replace('₹', ''));
  return total + (price * item.quantity);
  }, 0);

  if (!cart || cart.length === 0) {
    return (
      <CartContainer>
        <CartHeader>Shopping Cart</CartHeader>
        <EmptyCart>
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart to see them here!</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.href = '/products'}
          >
            Continue Shopping
          </Button>
        </EmptyCart>
      </CartContainer>
    );
  }

  // Add these after CartSummary styled component
  const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: ${theme.colors.lightText};
  `;
  
  const Divider = styled.hr`
    border: 0;
    border-top: 1px solid ${theme.colors.disabled};
    margin: 1rem 0;
  `;
  
  // Then in the return statement, update the CartSummary section:
  return (
    <CartContainer>
      <CartHeader>Shopping Cart</CartHeader>
      
      {cart.map(item => (
        <CartItem key={item.id}>
          <ItemImage src={item.image} alt={item.name} />
          <ItemInfo>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <QuantitySelector
              quantity={item.quantity}
              onChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
            />
          </ItemInfo>
          <ItemActions>
            <PriceInfo>
              <p>Price per item: {item.price}</p>
              <p className="price">Total: ₹{parseFloat(item.price.replace("₹","")) * item.quantity}</p>
            </PriceInfo>
            <RemoveButton 
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove Item
            </RemoveButton>
          </ItemActions>
        </CartItem>
      ))}

      <CartSummary>
        <SummaryRow>
          <span>Subtotal ({cart.length} items):</span>
          <span>₹{cartTotal}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Delivery Charges:</span>
          <span>FREE</span>
        </SummaryRow>
        <Divider />
        <Total>
          <span>Total Amount:</span>
          <span>₹{cartTotal}</span>
        </Total>
        <CheckoutButton variant="primary">
          Proceed to Checkout
        </CheckoutButton>
      </CartSummary>
    </CartContainer>
  );
}

export default Cart;
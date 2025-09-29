import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DetailCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.large};
  padding: 2rem;
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductInfo = styled.div`
  .product-name {
    font-size: 2rem;
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  .farmer-info {
    color: ${theme.colors.accent};
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .description {
    margin: 1.5rem 0;
    line-height: 1.6;
  }

  .price {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${theme.colors.primary};
    margin: 1rem 0;
  }

  .details-section {
    background: ${theme.colors.lightGrey};
    padding: 1rem;
    border-radius: ${theme.borderRadius.small};
    margin: 1rem 0;

    h4 {
      color: ${theme.colors.primary};
      margin-bottom: 0.5rem;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      margin: 0.5rem 0;
    }
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;

  button {
    background: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${theme.borderRadius.small};
    width: 30px;
    height: 30px;
    cursor: pointer;
    
    &:hover {
      background: ${theme.colors.accent};
    }
  }

  span {
    font-size: 1.2rem;
    min-width: 40px;
    text-align: center;
  }
`;

function ProductDetail({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <Modal onClick={onClose}>
      <DetailCard onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ProductContent>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: theme.borderRadius.medium }}
          />
          <ProductInfo>
            <h2 className="product-name">{product.name}</h2>
            <p className="farmer-info">
              Grown by {product.farmerName} • {product.season}
            </p>
            <p className="description">{product.description}</p>
            <div className="details-section">
              <h4>Product Details</h4>
              <ul>
                <li>Available in: {product.availability}</li>
                <li>Unit: {product.unit}</li>
                <li>{product.nutritionInfo}</li>
                <li>{product.storageInfo}</li>
              </ul>
            </div>
            <div className="price">{product.price}</div>
            <QuantitySelector>
              <button onClick={() => quantity > 1 && setQuantity(q => q - 1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </QuantitySelector>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </ProductInfo>
        </ProductContent>
      </DetailCard>
    </Modal>
  );
}

export default ProductDetail;
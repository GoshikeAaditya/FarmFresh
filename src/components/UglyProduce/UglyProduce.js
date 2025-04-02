import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import Button from '../common/Button';
import QuantitySelector from '../common/QuantitySelector';
import { useCart } from '../../context/CartContext';

const UglyProduceContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    color: ${theme.colors.primary};
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: ${theme.colors.text};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${theme.shadows.small};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Keep all styled components at the top
const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;

  h3 {
    margin: 0 0 0.5rem;
    color: ${theme.colors.text};
  }

  .price {
    color: ${theme.colors.primary};
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.5rem 0;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .original-price {
    text-decoration: line-through;
    color: ${theme.colors.lightText};
    font-size: 1rem;
  }

  .savings {
    color: ${theme.colors.success};
    font-size: 0.9rem;
  }
`;

function UglyProduce() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    fetchUglyProduce();
  }, []);

  const fetchUglyProduce = async () => {
    const mockUglyProduce = [
      {
        id: 'ugly-1',
        name: 'Wonky Carrots',
        price: 30,
        originalPrice: 60,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80',
        description: 'Perfectly tasty but uniquely shaped carrots'
      },
      {
        id: 'ugly-2',
        name: 'Imperfect Potatoes',
        price: 25,
        originalPrice: 50,
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80',
        description: 'Oddly shaped but delicious potatoes'
      },
      {
        id: 'ugly-3',
        name: 'Twisted Cucumbers',
        price: 20,
        originalPrice: 35,
        image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80',
        description: 'Curved but crispy cucumbers'
      },
      {
        id: 'ugly-4',
        name: 'Spotted Apples',
        price: 60,
        originalPrice: 120,
        image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80',
        description: 'Naturally spotted but sweet apples'
      },
      {
        id: 'ugly-5',
        name: 'Misshapen Tomatoes',
        price: 25,
        originalPrice: 40,
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80',
        description: 'Uniquely shaped, perfectly ripe tomatoes'
      },
      // Removing oversized zucchini product
      {
        id: 'ugly-7',
        name: 'Bumpy Lemons',
        price: 40,
        originalPrice: 80,
        image: 'https://images.unsplash.com/photo-1582087463261-ddea03f80e5d?auto=format&fit=crop&q=80',
        description: 'Textured but juicy lemons'
      },
      {
        id: 'ugly-8',
        name: 'Unusual Pears',
        price: 45,
        originalPrice: 90,
        image: 'https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?auto=format&fit=crop&q=80',
        description: 'Irregularly shaped but sweet pears'
      },
      {
        id: 'ugly-9',
        name: 'Curved Bell Peppers',
        price: 35,
        originalPrice: 70,
        image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80',
        description: 'Uniquely shaped bell peppers'
      },
      {
        id: 'ugly-10',
        name: 'Tiny Cauliflower',
        price: 30,
        originalPrice: 45,
        image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&q=80',
        description: 'Small but perfectly formed cauliflower'
      }
    ];
    setProducts(mockUglyProduce);
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  return (
    <UglyProduceContainer>
      <Header>
        <h1>Ugly Produce</h1>
        <p>
          Help reduce food waste by purchasing perfectly good but uniquely shaped produce at discounted prices. 
          These fruits and vegetables might look different, but they taste just as great!
        </p>
      </Header>

      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductImage 
              src={product.image} 
              alt={product.name}
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
            />
            <ProductInfo>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="price">
                <span>₹{product.price}</span>
                <span className="original-price">₹{product.originalPrice}</span>
                <span className="savings">
                  Save {Math.round((1 - product.price/product.originalPrice) * 100)}%
                </span>
              </div>
              <QuantitySelector
                quantity={quantities[product.id] || 1}
                onChange={(newQuantity) => 
                  setQuantities(prev => ({ ...prev, [product.id]: newQuantity }))
                }
              />
              <Button 
                variant="secondary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </UglyProduceContainer>
  );
}

export default UglyProduce;
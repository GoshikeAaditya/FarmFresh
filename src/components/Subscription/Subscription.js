import React from 'react';
import styled from 'styled-components';

const SubscriptionContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BoxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const BoxCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const BoxImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BoxContent = styled.div`
  padding: 20px;
`;

const SubscribeButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;

  &:hover {
    background-color: #45a049;
  }
`;

function Subscription() {
  const boxes = [
    {
      id: 1,
      name: 'Seasonal Veggie Box',
      description: 'A curated selection of seasonal vegetables',
      price: 599,
      frequency: 'Weekly',
      image: 'https://example.com/veggie-box.jpg',
      items: '8-10 different vegetables'
    },
    {
      id: 2,
      name: 'Mixed Fruit Box',
      description: 'Fresh seasonal fruits',
      price: 699,
      frequency: 'Weekly',
      image: 'https://example.com/fruit-box.jpg',
      items: '6-8 different fruits'
    },
    {
      id: 3,
      name: 'Organic Essential Box',
      description: 'Essential organic vegetables and fruits',
      price: 899,
      frequency: 'Weekly',
      image: 'https://example.com/organic-box.jpg',
      items: 'Mix of fruits and vegetables'
    }
  ];

  return (
    <SubscriptionContainer>
      <h2>Subscription Boxes</h2>
      <p>Get fresh produce delivered regularly with our subscription boxes</p>

      <BoxGrid>
        {boxes.map(box => (
          <BoxCard key={box.id}>
            <BoxImage src={box.image} alt={box.name} />
            <BoxContent>
              <h3>{box.name}</h3>
              <p>{box.description}</p>
              <p><strong>Contents:</strong> {box.items}</p>
              <p><strong>Frequency:</strong> {box.frequency}</p>
              <p><strong>Price:</strong> ₹{box.price}</p>
              <SubscribeButton>Subscribe Now</SubscribeButton>
            </BoxContent>
          </BoxCard>
        ))}
      </BoxGrid>
    </SubscriptionContainer>
  );
}

export default Subscription;
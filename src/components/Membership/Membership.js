import React from 'react';
import styled from 'styled-components';

const MembershipContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const PlanCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const PlanPrice = styled.div`
  font-size: 2.5em;
  color: #4CAF50;
  margin: 20px 0;
`;

const JoinButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

function Membership() {
  const plans = [
    {
      id: 1,
      name: 'Basic',
      price: 199,
      period: 'month',
      features: [
        'Free delivery on orders above ₹500',
        '5% discount on all products',
        'Access to member-only sales'
      ]
    },
    {
      id: 2,
      name: 'Premium',
      price: 499,
      period: 'month',
      features: [
        'Free delivery on all orders',
        '10% discount on all products',
        'Priority customer support',
        'Early access to new products',
        'Free recipe consultation'
      ]
    }
  ];

  return (
    <MembershipContainer>
      <h2>Become a FarmFresh Member</h2>
      <p>Join our membership program and enjoy exclusive benefits</p>
      
      <PlanGrid>
        {plans.map(plan => (
          <PlanCard key={plan.id}>
            <h3>{plan.name}</h3>
            <PlanPrice>
              ₹{plan.price}
              <span style={{ fontSize: '0.4em', color: '#666' }}>/{plan.period}</span>
            </PlanPrice>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {plan.features.map((feature, index) => (
                <li key={index} style={{ margin: '10px 0' }}>✓ {feature}</li>
              ))}
            </ul>
            <JoinButton>Join Now</JoinButton>
          </PlanCard>
        ))}
      </PlanGrid>
    </MembershipContainer>
  );
}

export default Membership;
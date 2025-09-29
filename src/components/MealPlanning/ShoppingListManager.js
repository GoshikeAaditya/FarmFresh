import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { useMealPlan } from '../../context/MealPlanContext';
import { useCart } from '../../context/CartContext';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const CategorySection = styled.div`
  margin-bottom: 2rem;
  background: white;
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${theme.shadows.small};
`;

const CategoryHeader = styled.div`
  background: ${theme.colors.primary};
  color: white;
  padding: 1rem 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
`;

const ItemList = styled.div`
  padding: 1rem;
`;

const ShoppingItem = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${theme.colors.lightGray};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  
  h4 {
    color: ${theme.colors.text};
    margin-bottom: 0.25rem;
    font-size: 1rem;
  }
  
  p {
    color: ${theme.colors.lightText};
    font-size: 0.9rem;
    margin: 0;
  }
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityInput = styled.input`
  width: 80px;
  padding: 0.5rem;
  border: 2px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.small};
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ActionButton = styled.button`
  background: ${props => props.variant === 'danger' ? '#dc3545' : theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const SummaryCard = styled.div`
  background: ${theme.colors.lightGray};
  padding: 1.5rem;
  border-radius: ${theme.borderRadius.medium};
  margin-bottom: 2rem;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  text-align: center;
`;

const SummaryItem = styled.div`
  h4 {
    color: ${theme.colors.primary};
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${theme.colors.text};
    font-size: 0.9rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${theme.colors.lightText};
  
  h3 {
    color: ${theme.colors.text};
    margin-bottom: 1rem;
  }
`;

function ShoppingListManager() {
  const { shoppingList, removeFromShoppingList, updateShoppingListQuantity } = useMealPlan();
  const { addToCart } = useCart();
  const [checkedItems, setCheckedItems] = useState(new Set());

  // Mock shopping list data if none exists
  const mockShoppingList = [
    {
      category: 'Vegetables',
      items: [
        { name: 'Tomatoes', quantity: '1 kg', estimatedPrice: '₹40', notes: 'Fresh, ripe' },
        { name: 'Onions', quantity: '2 kg', estimatedPrice: '₹60', notes: 'Medium size' },
        { name: 'Spinach', quantity: '500g', estimatedPrice: '₹30', notes: 'Fresh leaves' }
      ]
    },
    {
      category: 'Grains & Pulses',
      items: [
        { name: 'Basmati Rice', quantity: '5 kg', estimatedPrice: '₹250', notes: 'Premium quality' },
        { name: 'Toor Dal', quantity: '1 kg', estimatedPrice: '₹120', notes: 'Organic' }
      ]
    },
    {
      category: 'Dairy & Proteins',
      items: [
        { name: 'Milk', quantity: '2 L', estimatedPrice: '₹120', notes: 'Fresh daily' },
        { name: 'Paneer', quantity: '500g', estimatedPrice: '₹180', notes: 'Homemade style' }
      ]
    },
    {
      category: 'Spices & Condiments',
      items: [
        { name: 'Turmeric Powder', quantity: '200g', estimatedPrice: '₹80', notes: 'Organic' },
        { name: 'Cumin Seeds', quantity: '100g', estimatedPrice: '₹60', notes: 'Whole' }
      ]
    }
  ];

  const displayList = shoppingList.length > 0 ? shoppingList : mockShoppingList;

  const toggleItemCheck = (category, itemName) => {
    const itemKey = `${category}-${itemName}`;
    const newChecked = new Set(checkedItems);
    
    if (newChecked.has(itemKey)) {
      newChecked.delete(itemKey);
    } else {
      newChecked.add(itemKey);
    }
    
    setCheckedItems(newChecked);
  };

  const addToCartHandler = (item, category) => {
    addToCart({
      id: `shopping-${Date.now()}-${Math.random()}`,
      name: item.name,
      price: item.estimatedPrice || '₹0',
      weight: item.quantity,
      category: category,
      image: 'https://via.placeholder.com/150'
    }, 1);
    
    alert(`${item.name} added to cart!`);
  };

  const calculateTotals = () => {
    let totalItems = 0;
    let totalCost = 0;
    
    displayList.forEach(category => {
      totalItems += category.items.length;
      category.items.forEach(item => {
        const price = parseInt(item.estimatedPrice.replace('₹', '')) || 0;
        totalCost += price;
      });
    });
    
    return { totalItems, totalCost };
  };

  const { totalItems, totalCost } = calculateTotals();

  if (displayList.length === 0) {
    return (
      <EmptyState>
        <h3>No Shopping List Generated</h3>
        <p>Generate a meal plan first to create an optimized shopping list.</p>
      </EmptyState>
    );
  }

  return (
    <Container>
      <SummaryCard>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: theme.colors.primary }}>
          Shopping Summary
        </h3>
        <SummaryGrid>
          <SummaryItem>
            <h4>{totalItems}</h4>
            <p>Total Items</p>
          </SummaryItem>
          <SummaryItem>
            <h4>₹{totalCost}</h4>
            <p>Estimated Cost</p>
          </SummaryItem>
          <SummaryItem>
            <h4>{checkedItems.size}</h4>
            <p>Items Checked</p>
          </SummaryItem>
          <SummaryItem>
            <h4>{Math.round((checkedItems.size / totalItems) * 100)}%</h4>
            <p>Progress</p>
          </SummaryItem>
        </SummaryGrid>
      </SummaryCard>

      {displayList.map(category => (
        <CategorySection key={category.category}>
          <CategoryHeader>
            {category.category} ({category.items.length} items)
          </CategoryHeader>
          <ItemList>
            {category.items.map(item => {
              const itemKey = `${category.category}-${item.name}`;
              const isChecked = checkedItems.has(itemKey);
              
              return (
                <ShoppingItem key={item.name} style={{ opacity: isChecked ? 0.6 : 1 }}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleItemCheck(category.category, item.name)}
                    style={{ marginRight: '1rem' }}
                  />
                  
                  <ItemInfo>
                    <h4 style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
                      {item.name}
                    </h4>
                    <p>Quantity: {item.quantity} | Price: {item.estimatedPrice}</p>
                    {item.notes && <p>Note: {item.notes}</p>}
                  </ItemInfo>
                  
                  <ItemActions>
                    <QuantityInput
                      type="text"
                      defaultValue={item.quantity}
                      onChange={(e) => updateShoppingListQuantity?.(item.name, e.target.value)}
                    />
                    <ActionButton
                      onClick={() => addToCartHandler(item, category.category)}
                      disabled={isChecked}
                    >
                      Add to Cart
                    </ActionButton>
                    <ActionButton
                      variant="danger"
                      onClick={() => removeFromShoppingList?.(item.name)}
                    >
                      Remove
                    </ActionButton>
                  </ItemActions>
                </ShoppingItem>
              );
            })}
          </ItemList>
        </CategorySection>
      ))}
    </Container>
  );
}

export default ShoppingListManager;
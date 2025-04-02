import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

const FarmersContainer = styled.div`
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
    max-width: 800px;
    margin: 0 auto;
  }
`;

const FarmerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

// Remove the duplicate Overlay and FarmerInfo components and replace with these updated versions:

const FarmerCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 1.5rem;
  box-shadow: ${theme.shadows.small};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }

  ${props => props.isExpanded && `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: ${theme.shadows.large};
    animation: expandCard 0.3s ease forwards;
  `}

  @keyframes expandCard {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 998;
  animation: fadeIn 0.3s ease forwards;
  backdrop-filter: blur(3px);

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const FarmerInfo = styled.div`
  h3 {
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
    font-size: ${props => props.isExpanded ? '1.8rem' : '1.4rem'};
    transition: font-size 0.3s ease;
  }
  
  .location {
    color: ${theme.colors.accent};
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .products {
    margin-top: 1.5rem;
    animation: slideUp 0.4s ease forwards;
    
    h4 {
      color: ${theme.colors.text};
      margin-bottom: 1rem;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      display: flex;
      flex-direction: column;
      padding: 1rem 0;
      border-bottom: 1px solid ${theme.colors.lightGrey};
      animation: slideIn 0.3s ease forwards;
      animation-delay: calc(0.1s * var(--index));

      .product-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-weight: bold;
      }

      .product-details {
        font-size: 0.9rem;
        color: ${theme.colors.text};
        margin: 0.3rem 0;
      }

      .product-availability {
        font-size: 0.85rem;
        color: ${theme.colors.accent};
      }
    }
  }
`;

// Remove this standalone product list rendering
// <ul>
//   {farmer.products.map((product, index) => (
//     <li key={index} style={{"--index": index}}>
//       <div className="product-header">
//         <span>{product.name}</span>
//         <span>{product.season}</span>
//       </div>
//       <div className="product-details">
//         {product.description}
//       </div>
//       <div className="product-availability">
//         Available in: {product.availability} ({product.unit})
//       </div>
//     </li>
//   ))}
// </ul>

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.text};
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

// Update the farmers data with product descriptions and units
const farmers = [
  {
    id: 1,
    name: "Rajesh Patel",
    location: "Green Fields Farm, Gujarat",
    specialty: "Organic Grains & Pulses",
    description: "Multi-generational farmer practicing traditional organic farming methods",
    certification: "India Organic Certified",
    products: [
      {
        name: "Organic Basmati Rice",
        season: "Kharif",
        description: "Premium long-grain basmati rice, aged for perfect aroma and taste. Grown using traditional methods.",
        unit: "per kg",
        availability: "1kg, 5kg, 25kg bags",
        nutritionInfo: "Rich in carbohydrates, protein, and minerals",
        storageInfo: "Store in airtight container in cool, dry place",
        price: "₹180/kg",
        image: "/images/basmati-rice.jpg"
      },
      {
        name: "Yellow Toor Dal",
        season: "Year-round",
        description: "Premium quality split pigeon peas, naturally processed and cleaned",
        unit: "per kg",
        availability: "500g, 1kg packets",
        nutritionInfo: "High in protein and dietary fiber",
        storageInfo: "Store in airtight container",
        price: "₹120/kg",
        image: "/images/toor-dal.jpg"
      },
      {
        name: "Organic Wheat",
        season: "Rabi",
        description: "Stone-ground whole wheat, perfect for chapatis and breads",
        unit: "per kg",
        availability: "5kg, 10kg bags",
        nutritionInfo: "Rich in fiber and complex carbohydrates",
        storageInfo: "Store in cool, dry place",
        price: "₹45/kg",
        image: "/images/wheat.jpg"
      }
    ]
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    location: "Spice Gardens, Kerala",
    specialty: "Organic Spices",
    description: "Traditional spice farmer using sustainable practices",
    certification: "Organic India Certified",
    products: [
      {
        name: "Black Pepper",
        season: "Year-round",
        description: "Single-origin black peppercorns from Kerala's finest plantations",
        unit: "per 100g",
        availability: "100g, 250g packs",
        nutritionInfo: "Rich in antioxidants and anti-inflammatory properties",
        storageInfo: "Store in airtight container away from sunlight",
        price: "₹85/100g",
        image: "/images/black-pepper.jpg"
      },
      {
        name: "Cardamom Pods",
        season: "Year-round",
        description: "Premium green cardamom pods with intense aroma",
        unit: "per 50g",
        availability: "50g, 100g packs",
        nutritionInfo: "Contains essential oils and minerals",
        storageInfo: "Keep in airtight container in cool place",
        price: "₹160/50g",
        image: "/images/cardamom.jpg"
      }
    ]
  },
  {
    id: 3,
    name: "Arjun Singh",
    location: "Himalayan Orchards, Himachal Pradesh",
    specialty: "Mountain Fruits",
    description: "High-altitude fruit farming using natural methods",
    certification: "Himalayan Organic Certified",
    products: [
      {
        name: "Shimla Apples",
        season: "Autumn",
        description: "Sweet and crispy apples from Himalayan orchards",
        unit: "per kg",
        availability: "2kg, 5kg boxes",
        nutritionInfo: "Rich in fiber and antioxidants",
        storageInfo: "Refrigerate for best freshness",
        price: "₹160/kg",
        image: "/images/shimla-apples.jpg"
      }
    ]
  },
  {
    id: 4,
    name: "Priya Sharma",
    location: "Valley Greens, Uttarakhand",
    specialty: "Organic Vegetables",
    description: "Practicing sustainable farming in the Himalayan foothills",
    certification: "Natural Farming Certified",
    products: [
      {
        name: "Red Carrots",
        season: "Winter",
        description: "Sweet and crunchy mountain carrots, grown naturally without pesticides",
        unit: "per kg",
        availability: "500g, 1kg packets",
        nutritionInfo: "Rich in beta-carotene and fiber",
        storageInfo: "Store in refrigerator",
        price: "₹60/kg",
        image: "/images/red-carrots.jpg"
      },
      {
        name: "Green Peas",
        season: "Winter",
        description: "Fresh, tender peas from mountain slopes",
        unit: "per kg",
        availability: "500g, 1kg packets",
        nutritionInfo: "High in protein and fiber",
        storageInfo: "Keep refrigerated",
        price: "₹80/kg",
        image: "/images/green-peas.jpg"
      }
    ]
  },
  {
    id: 5,
    name: "Mohammad Ismail",
    location: "Saffron Fields, Kashmir",
    specialty: "Saffron and Dry Fruits",
    description: "Third-generation saffron farmer using traditional methods",
    certification: "GI Certified",
    products: [
      {
        name: "Kashmir Saffron",
        season: "Autumn",
        description: "Premium grade Kashmiri saffron threads with intense aroma and color",
        unit: "per gram",
        availability: "1g, 5g, 10g boxes",
        nutritionInfo: "Rich in antioxidants and minerals",
        storageInfo: "Store in airtight container away from light",
        price: "₹400/g",
        image: "/images/saffron.jpg"
      },
      {
        name: "Kashmiri Walnuts",
        season: "Year-round",
        description: "Premium quality walnuts from Kashmir valley",
        unit: "per kg",
        availability: "250g, 500g, 1kg packs",
        nutritionInfo: "Rich in omega-3 fatty acids",
        storageInfo: "Store in cool, dry place",
        price: "₹800/kg",
        image: "/images/walnuts.jpg"
      }
    ]
  },
  {
    id: 6,
    name: "Meena Kumari",
    location: "Organic Fields, Madhya Pradesh",
    specialty: "Organic Grains and Millets",
    description: "Leading organic farmer promoting indigenous grain varieties",
    certification: "Organic India Certified",
    products: [
      {
        name: "Pearl Millet",
        season: "Kharif",
        description: "Nutrient-rich pearl millet grown using traditional methods",
        unit: "per kg",
        availability: "1kg, 5kg bags",
        nutritionInfo: "High in protein and minerals",
        storageInfo: "Store in airtight container",
        price: "₹70/kg",
        image: "/images/pearl-millet.jpg"
      },
      {
        name: "Finger Millet",
        season: "Kharif",
        description: "Organic finger millet (ragi) rich in calcium",
        unit: "per kg",
        availability: "500g, 1kg packs",
        nutritionInfo: "Rich in calcium and iron",
        storageInfo: "Store in cool, dry place",
        price: "₹90/kg",
        image: "/images/finger-millet.jpg"
      },
      {
        name: "Black Chickpeas",
        season: "Year-round",
        description: "Traditional black chickpeas, naturally grown",
        unit: "per kg",
        availability: "500g, 1kg packs",
        nutritionInfo: "High in protein and fiber",
        storageInfo: "Store in airtight container",
        price: "₹120/kg",
        image: "/images/black-chickpeas.jpg"
      }
    ]
  }
];

// Add new styled component for product details card
const ProductDetailCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  background: white;
  padding: 2rem;
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.large};
  z-index: 1001;
  animation: fadeIn 0.3s ease;

  h4 {
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .farmer-name {
    color: ${theme.colors.accent};
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .product-info {
    margin: 1.5rem 0;
    line-height: 1.6;
  }

  .availability-info {
    background: ${theme.colors.lightGrey};
    padding: 1rem;
    border-radius: ${theme.borderRadius.small};
    margin-top: 1rem;
  }
`;

// Add state for selected product
function Farmers() {
  const [expandedFarmer, setExpandedFarmer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (e, product, farmer) => {
    e.stopPropagation();
    setSelectedProduct({ ...product, farmerName: farmer.name });
  };

  const renderProductList = (farmer) => (
    <ul>
      {farmer.products.map((product, index) => (
        <li 
          key={index} 
          onClick={(e) => handleProductClick(e, product, farmer)}
          style={{ cursor: 'pointer', "--index": index }}
        >
          <div className="product-header">
            <span>{product.name}</span>
            <span>{product.season}</span>
          </div>
          <div className="product-details">
            {product.description}
          </div>
          <div className="product-availability">
            Available in: {product.availability} ({product.unit})
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <FarmersContainer>
      <Header>
        <h1>Our Local Farmers</h1>
        <p>Meet the dedicated farmers who bring fresh produce to your table. Each farmer specializes in specific crops and follows sustainable farming practices.</p>
      </Header>

      <FarmerGrid>
        {farmers.map(farmer => (
          <FarmerCard
            key={farmer.id}
            onClick={() => setExpandedFarmer(farmer)}
            isExpanded={expandedFarmer?.id === farmer.id}
          >
            <FarmerInfo isExpanded={expandedFarmer?.id === farmer.id}>
              <h3>{farmer.name}</h3>
              <p className="location">{farmer.location}</p>
              <p>{farmer.specialty}</p>
              {expandedFarmer?.id === farmer.id && (
                <>
                  <div className="products">
                    <h4>Products & Seasons:</h4>
                    {renderProductList(farmer)}
                  </div>
                  <CloseButton 
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedFarmer(null);
                    }}
                  >
                    ×
                  </CloseButton>
                </>
              )}
            </FarmerInfo>
          </FarmerCard>
        ))}
      </FarmerGrid>

      {expandedFarmer && (
        <Overlay onClick={() => setExpandedFarmer(null)} />
      )}

      {/* Add Product Detail Modal */}
      {selectedProduct && (
        <>
          <Overlay onClick={() => setSelectedProduct(null)} style={{ zIndex: 1000 }} />
          <ProductDetailCard>
            <h4>{selectedProduct.name}</h4>
            <p className="farmer-name">Grown by {selectedProduct.farmerName}</p>
            <div className="product-info">
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Season:</strong> {selectedProduct.season}</p>
              <p><strong>Unit Size:</strong> {selectedProduct.unit}</p>
            </div>
            <div className="availability-info">
              <p><strong>Available Packaging:</strong> {selectedProduct.availability}</p>
            </div>
            <CloseButton onClick={() => setSelectedProduct(null)}>×</CloseButton>
          </ProductDetailCard>
        </>
      )}
    </FarmersContainer>
  );
}

export default Farmers;
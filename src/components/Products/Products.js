import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

const ProductsContainer = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Header = styled.div`
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

const ProductCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${theme.shadows.small};
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const ProductImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const ProductInfo = styled.div`
  h3 {
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  .farmer-info {
    color: ${theme.colors.accent};
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .description {
    color: ${theme.colors.text};
    margin: 1rem 0;
    line-height: 1.4;
  }

  .details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${theme.colors.lightGrey};
  }

  .weight {
    font-size: 0.9rem;
    color: ${theme.colors.text};
  }

  .price {
    font-weight: bold;
    color: ${theme.colors.primary};
  }
`;

const products = [
  {
    id: 1,
    name: "Kashmiri Apples",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    description: "Premium Kashmiri apples known for their sweet-tart flavor and crisp texture. Grown in the pristine valleys of Kashmir.",
    price: "₹180",
    weight: "1 kg",
    packaging: "1kg, 3kg boxes",
    farmer: {
      name: "Mohammad Yusuf",
      farm: "Valley Apple Orchards",
      location: "Kashmir",
      certification: "GI Certified"
    },
    nutritionInfo: "Rich in fiber, antioxidants and vitamins",
    season: "Autumn",
    storageInfo: "Store in cool, dry place or refrigerate"
  },
  {
    id: 2,
    name: "Farm Fresh Tomatoes",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
    description: "Vine-ripened, juicy tomatoes from Maharashtra's organic farms. Perfect for salads and cooking.",
    price: "₹40",
    weight: "500 g",
    packaging: "500g, 1kg packs",
    farmer: {
      name: "Rajesh Patil",
      farm: "Green Valley Farms",
      location: "Maharashtra",
      certification: "Organic Certified"
    },
    nutritionInfo: "High in Vitamin C and antioxidants",
    season: "Year-round",
    storageInfo: "Store at room temperature until ripe"
  },
  {
    id: 3,
    name: "Organic Brinjal",
    image: "https://images.unsplash.com/photo-1528826007177-f38517ce9a8a?q=80&w=2377&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Fresh, tender brinjals from Karnataka's organic farms. Perfect for traditional Indian dishes.",
    price: "₹30",
    weight: "500 g",
    packaging: "500g pack",
    farmer: {
      name: "Venkatesh Kumar",
      farm: "Organic Vegetable Farm",
      location: "Karnataka",
      certification: "Organic Certified"
    },
    nutritionInfo: "Low in calories, high in fiber",
    season: "Year-round",
    storageInfo: "Refrigerate in vegetable drawer"
  },
  {
    id: 4,
    name: "Premium Basmati Rice",
    image: "https://img.freepik.com/free-photo/top-view-rice-seed-texture_140725-12477.jpg?t=st=1743569694~exp=1743573294~hmac=c947b08c55ca350997acd2c0475fbfadd8e99b45a1459eaa3fff60da4b831867&w=2000",
    description: "Aged basmati rice from Punjab's fertile plains. Known for its distinctive aroma and long grains.",
    price: "₹250",
    weight: "5 kg",
    packaging: "1kg, 5kg, 10kg bags",
    farmer: {
      name: "Gurpreet Singh",
      farm: "Golden Fields",
      location: "Punjab",
      certification: "Premium Grade"
    },
    nutritionInfo: "Rich in carbohydrates and minerals",
    season: "Year-round",
    storageInfo: "Store in airtight container in cool, dry place"
  },
  {
    id: 5,
    name: "Organic Jaggery",
    image: "https://img.freepik.com/free-photo/healthy-jaggery-still-life-assortment_23-2149161581.jpg?ga=GA1.1.1784201887.1743175450&semt=ais_hybrid",
    description: "Traditional sugarcane jaggery from Maharashtra's farms. Natural sweetener with rich mineral content.",
    price: "₹90",
    weight: "500 g",
    packaging: "500g, 1kg blocks",
    farmer: {
      name: "Anant Jadhav",
      farm: "Sweet Fields",
      location: "Maharashtra",
      certification: "Organic Certified"
    },
    nutritionInfo: "Contains iron, minerals and natural sugars",
    season: "Winter",
    storageInfo: "Store in airtight container in cool, dry place"
  },
  {
    id: 6,
    name: "Fresh Bananas",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
    description: "Sweet and nutritious bananas from Kerala's plantations. Perfect for snacking and cooking.",
    price: "₹60",
    weight: "dozen",
    packaging: "6pc, 12pc bunches",
    farmer: {
      name: "Joseph Thomas",
      farm: "Tropical Fruits Farm",
      location: "Kerala",
      certification: "Natural Farming"
    },
    nutritionInfo: "Rich in potassium and vitamins",
    season: "Year-round",
    storageInfo: "Store at room temperature until ripe"
  },
  {
    id: 7,
    name: "Alphonso Mangoes",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078",
    description: "Premium Ratnagiri Alphonso mangoes. Known for their rich, sweet flavor and smooth texture.",
    price: "₹600",
    weight: "dozen",
    packaging: "6pc, 12pc boxes",
    farmer: {
      name: "Prakash Desai",
      farm: "Konkan Orchards",
      location: "Maharashtra",
      certification: "GI Certified"
    },
    nutritionInfo: "High in Vitamin A and C",
    season: "Summer",
    storageInfo: "Store at room temperature until ripe"
  },
  {
    id: 8,
    name: "Organic Carrots",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
    description: "Fresh, crunchy carrots from Himachal Pradesh. Perfect for salads and cooking.",
    price: "₹40",
    weight: "500 g",
    packaging: "500g, 1kg packs",
    farmer: {
      name: "Ramesh Thakur",
      farm: "Mountain Valley Farm",
      location: "Himachal Pradesh",
      certification: "Organic Certified"
    },
    nutritionInfo: "Rich in beta carotene and fiber",
    season: "Winter",
    storageInfo: "Refrigerate in vegetable drawer"
  },
  {
    id: 9,
    name: "Fresh Spinach",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    description: "Crisp, nutrient-rich spinach from Punjab's farms. Perfect for healthy cooking.",
    price: "₹30",
    weight: "250 g",
    packaging: "250g, 500g bunches",
    farmer: {
      name: "Harpreet Kaur",
      farm: "Green Leaf Gardens",
      location: "Punjab",
      certification: "Organic Certified"
    },
    nutritionInfo: "High in iron and vitamins",
    season: "Winter",
    storageInfo: "Refrigerate in vegetable drawer"
  },
  {
    id: 10,
    name: "Green Chillies",
    image: "https://img.freepik.com/free-photo/top-view-green-peppers-surface_176474-771.jpg?t=st=1743569744~exp=1743573344~hmac=3a1a9864265ed4dd14c64efcda9601c3dc78a92121952b3aa164d5a0a469b9b5&w=2000",
    description: "Fresh, spicy green chillies from Andhra Pradesh. Perfect for adding heat to dishes.",
    price: "₹20",
    weight: "100 g",
    packaging: "100g, 250g packs",
    farmer: {
      name: "Lakshmi Reddy",
      farm: "Spice Gardens",
      location: "Andhra Pradesh",
      certification: "Natural Farming"
    },
    nutritionInfo: "Rich in Vitamin C and capsaicin",
    season: "Year-round",
    storageInfo: "Refrigerate in vegetable drawer"
  },
  {
    id: 11,
    name: "Fresh Lemons",
    image: "https://images.unsplash.com/photo-1582087463261-ddea03f80e5d",
    description: "Juicy, aromatic lemons from Gujarat. Perfect for beverages and cooking.",
    price: "₹40",
    weight: "500 g",
    packaging: "500g pack",
    farmer: {
      name: "Mehul Patel",
      farm: "Citrus Grove",
      location: "Gujarat",
      certification: "Natural Farming"
    },
    nutritionInfo: "High in Vitamin C and antioxidants",
    season: "Year-round",
    storageInfo: "Store at room temperature"
  },
  {
    id: 12,
    name: "Green Cardamom",
    image: "https://img.freepik.com/free-photo/flat-lay-bowl-with-seeds_23-2148917702.jpg?t=st=1743569779~exp=1743573379~hmac=1af4d8b39957bfb164a9baf2e1445ef013423c6541a5eb1a4f4f3d21d83a5ce4&w=1380",
    description: "Premium green cardamom from Kerala's spice gardens. Perfect for desserts and beverages.",
    price: "₹1200",
    weight: "100 g",
    packaging: "50g, 100g packs",
    farmer: {
      name: "George Thomas",
      farm: "Highland Spices",
      location: "Kerala",
      certification: "Organic Certified"
    },
    nutritionInfo: "Rich in essential oils and minerals",
    season: "Year-round",
    storageInfo: "Store in airtight container"
  },
  {
    id: 13,
    name: "Farm Fresh Milk",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    description: "Pure, fresh milk from Gujarat's dairy farms. Pasteurized and packed daily.",
    price: "₹60",
    weight: "1 L",
    packaging: "500ml, 1L packets",
    farmer: {
      name: "Rajesh Patel",
      farm: "Green Meadows Dairy",
      location: "Gujarat",
      certification: "FSSAI Certified"
    },
    nutritionInfo: "Rich in calcium and protein",
    season: "Year-round",
    storageInfo: "Keep refrigerated"
  },
  {
    id: 14,
    name: "Organic Wheat",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
    description: "Premium quality wheat from Madhya Pradesh's organic farms. Perfect for chapatis and baking.",
    price: "₹80",
    weight: "5 kg",
    packaging: "5kg, 10kg bags",
    farmer: {
      name: "Ramesh Sharma",
      farm: "Golden Wheat Fields",
      location: "Madhya Pradesh",
      certification: "Organic Certified"
    },
    nutritionInfo: "Rich in fiber and complex carbohydrates",
    season: "Year-round",
    storageInfo: "Store in airtight container"
  },
  {
    id: 15,
    name: "Assam Tea",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f",
    description: "Premium Assam black tea from historic tea gardens. Known for its rich, malty flavor.",
    price: "₹250",
    weight: "250 g",
    packaging: "250g, 500g packs",
    farmer: {
      name: "Pranab Gogoi",
      farm: "Heritage Tea Estate",
      location: "Assam",
      certification: "Tea Board Certified"
    },
    nutritionInfo: "Rich in antioxidants",
    season: "Year-round",
    storageInfo: "Store in airtight container"
  },
  {
    id: 16,
    name: "Organic Turmeric",
    image: "https://img.freepik.com/free-photo/turmeric-powder_1323-400.jpg?t=st=1743569863~exp=1743573463~hmac=0a78be40804260091dcc587d5cee199e06e8d2f817e3846f327c6d612fe3c4bf&w=2000",
    description: "Pure, organic turmeric from Tamil Nadu. Known for its high curcumin content.",
    price: "₹120",
    weight: "250 g",
    packaging: "100g, 250g packs",
    farmer: {
      name: "Muthu Kumar",
      farm: "Spice Gardens",
      location: "Tamil Nadu",
      certification: "Organic Certified"
    },
    nutritionInfo: "High in curcumin and antioxidants",
    season: "Year-round",
    storageInfo: "Store in airtight container"
  },
  {
    id: 17,
    name: "Brown Rice",
    image: "https://img.freepik.com/premium-photo/raw-brown-whole-rice-bowl-isolated-white-background_92534-2620.jpg?w=1380",
    description: "Nutritious brown rice from Karnataka. Perfect for healthy eating.",
    price: "₹150",
    weight: "5 kg",
    packaging: "1kg, 5kg bags",
    farmer: {
      name: "Venkatesh Rao",
      farm: "Organic Valley",
      location: "Karnataka",
      certification: "Organic Certified"
    },
    nutritionInfo: "Rich in fiber and B vitamins",
    season: "Year-round",
    storageInfo: "Store in airtight container"
  },
  {
    id: 18,
    name: "Organic Oats",
    image: "https://img.freepik.com/free-photo/raw-barley-grain-old-dark-background_1150-37928.jpg?t=st=1743569918~exp=1743573518~hmac=53af84a5e64e594f984775400d2a3424bab7caebd64513e1be7c0389394a69ee&w=2000",
    description: "Premium quality oats from Uttarakhand's organic farms. Perfect for healthy breakfast.",
    price: "₹180",
    weight: "1 kg",
    packaging: "500g, 1kg packs",
    farmer: {
      name: "Deepak Rawat",
      farm: "Mountain Organics",
      location: "Uttarakhand",
      certification: "Organic Certified"
    },
    nutritionInfo: "High in fiber and protein",
    season: "Year-round",
    storageInfo: "Store in airtight container"
  },
  {
    id: 19,
    name: "Premium Almonds",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46",
    description: "Premium quality almonds from Kashmir. Carefully selected and packed.",
    price: "₹900",
    weight: "500 g",
    packaging: "250g, 500g packs",
    farmer: {
      name: "Abdul Rahman",
      farm: "Valley Nut Farm",
      location: "Kashmir",
      certification: "Premium Grade"
    },
    nutritionInfo: "Rich in healthy fats and protein",
    season: "Year-round",
    storageInfo: "Store in airtight container"
  },
  {
    id: 20,
    name: "Premium Cashews",
    image: "https://img.freepik.com/free-photo/raw-cashews-nuts-bag-dark-background_1150-45358.jpg?t=st=1743569959~exp=1743573559~hmac=92e9821ba4b69efd1709961e2a8b3100fd2acc151546302f316b69f6fb5267de&w=2000",
    description: "Premium grade cashews from Kerala's coastal regions. Carefully processed and packed.",
    price: "₹850",
    weight: "500 g",
    packaging: "250g, 500g packs",
    farmer: {
      name: "Thomas George",
      farm: "Coastal Nut Farm",
      location: "Kerala",
      certification: "Premium Grade"
    },
    nutritionInfo: "Rich in healthy fats and protein",
    season: "Year-round",
    storageInfo: "Store in airtight container"
  }
];

const AddToCartButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  background: ${theme.colors.primary};
  color: white;
  padding: 0.8rem;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;

  button {
    background: ${theme.colors.lightGrey};
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 1.2rem;

    &:hover {
      background: ${theme.colors.accent};
      color: white;
    }
  }

  span {
    font-size: 1.1rem;
    min-width: 30px;
    text-align: center;
  }
`;

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

const DetailContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailInfo = styled.div`
  text-align: left;

  .product-name {
    font-size: 2rem;
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  .farmer-details {
    margin: 1rem 0;
    padding: 1rem;
    background: ${theme.colors.lightGrey};
    border-radius: ${theme.borderRadius.small};
  }

  .nutrition-info, .storage-info {
    margin: 1rem 0;
  }
`;

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

// Define ProductDetailModal before the Products component
const ProductDetailModal = ({ product, onClose }) => {
  const stopPropagation = (e) => e.stopPropagation();
  
  return (
    <Modal onClick={onClose}>
      <DetailCard onClick={stopPropagation}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <DetailContent>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: theme.borderRadius.medium }}
          />
          <DetailInfo>
            <h2 className="product-name">{product.name}</h2>
            <div className="farmer-details">
              <h3>Farmer Details</h3>
              <p>Farmer: {product.farmer.name}</p>
              <p>Farm: {product.farmer.farm}</p>
              <p>Location: {product.farmer.location}</p>
              <p>Certification: {product.farmer.certification}</p>
            </div>
            <p className="description">{product.description}</p>
            <div className="nutrition-info">
              <h3>Nutrition Information</h3>
              <p>{product.nutritionInfo}</p>
            </div>
            <div className="storage-info">
              <h3>Storage Instructions</h3>
              <p>{product.storageInfo}</p>
            </div>
            <div className="details">
              <p>Price: {product.price}</p>
              <p>Weight: {product.weight}</p>
              <p>Packaging: {product.packaging}</p>
              <p>Season: {product.season}</p>
            </div>
          </DetailInfo>
        </DetailContent>
      </DetailCard>
    </Modal>
  );
};

// Single Products component
function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantities(prev => ({ ...prev, [product.id]: 0 }));
    }
  };

  return (
    <ProductsContainer>
      <Header>
        <h1>Farm Fresh Products</h1>
        <p>Discover the finest organic produce directly from local farmers across India. 
           Each product is carefully cultivated using traditional and sustainable farming methods.</p>
      </Header>
      <ProductGrid>
        {products.map(product => (
          <ProductCard 
            key={product.id}
            onClick={(e) => {
              setSelectedProduct(product);
            }}
          >
            <ProductImage>
              <img src={product.image} alt={product.name} />
            </ProductImage>
            <ProductInfo>
              <h3>{product.name}</h3>
              <p className="farmer-info">
                By {product.farmer.name}
                <br />
                {product.farmer.farm}
              </p>
              <div className="details">
                <span className="price">{product.price}</span>
                <span className="weight">{product.weight}</span>
              </div>
              <QuantitySelector>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(product.id, -1);
                }}>-</button>
                <span>{quantities[product.id] || 0}</span>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(product.id, 1);
                }}>+</button>
              </QuantitySelector>
              <AddToCartButton onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}>
                Add to Cart
              </AddToCartButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </ProductsContainer>
  );
}

export default Products;
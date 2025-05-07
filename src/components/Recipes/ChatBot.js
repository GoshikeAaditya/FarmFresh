import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { generateAIRecipe } from '../../services/recipeService';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 350px;
  background: white;
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.medium};
  overflow: hidden;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  background: ${theme.colors.primary};
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatBody = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  padding: 0.8rem;
  border-radius: ${theme.borderRadius.small};
  max-width: 80%;
  white-space: pre-line;
  ${props => props.isUser ? `
    background: ${theme.colors.primary};
    color: white;
    align-self: flex-end;
  ` : `
    background: ${theme.colors.lightGrey};
    color: ${theme.colors.text};
    align-self: flex-start;
  `}
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${theme.colors.lightGrey};
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid ${theme.colors.disabled};
  border-radius: ${theme.borderRadius.small};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SendButton = styled.button`
  padding: 0.8rem 1.2rem;
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  
  &:disabled {
    background: ${theme.colors.disabled};
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1.5rem;  // Increased padding
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: ${theme.shadows.medium};
  z-index: 1000;
  font-size: 2rem;  // Added font size for larger emoji
  width: 80px;      // Added explicit width
  height: 80px;     // Added explicit height
  display: flex;    // Added for better emoji centering
  align-items: center;
  justify-content: center;
`;

// Remove the mockRecipes array since we'll be using OpenAI

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your AI Recipe Assistant. What ingredients would you like to cook with? I'll create a personalized recipe just for you! You can list multiple ingredients, and I'll suggest something delicious.", 
      isUser: false 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatRecipeResponse = (response) => {
    // Replace asterisks with bullet points
    let formattedResponse = response.replace(/\*/g, '•');
    
    // Ensure proper line breaks for sections
    formattedResponse = formattedResponse
      .replace(/Recipe Name:/g, '\nRecipe Name:')
      .replace(/Preparation Time:/g, '\nPreparation Time:')
      .replace(/Ingredients List:/g, '\nIngredients List:')
      .replace(/Simple Instructions:/g, '\nSimple Instructions:');
    
    return formattedResponse;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateAIRecipe(input);
      setMessages(prev => [...prev, { 
        text: formatRecipeResponse(response), 
        isUser: false 
      }]);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I couldn't generate a recipe right now. Please try again with different ingredients.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return <ToggleButton onClick={() => setIsOpen(true)}>🧑‍🍳</ToggleButton>;
  }

  return (
    <ChatbotContainer>
      <ChatHeader>
        <span>Recipe Assistant</span>
        <button onClick={() => setIsOpen(false)}>✕</button>
      </ChatHeader>
      <ChatBody>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
      </ChatBody>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter ingredients..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend} disabled={isLoading}>
          {isLoading ? '...' : '→'}
        </SendButton>
      </InputContainer>
    </ChatbotContainer>
  );
}

export default ChatBot;
import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const CTAContainer = styled.section`
  padding: 80px 20px;
  margin: 60px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: ${pulse} 4s ease-in-out infinite;
  }
`;

const CTATitle = styled.h2`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  color: white;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
`;

const CTAText = styled.p`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  background: white;
  color: #667eea;
  border: none;
  border-radius: 16px;
  padding: 18px 48px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export const CTABlock = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Скролл к форме записи
      const formElement = document.getElementById('signup-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <CTAContainer>
      <CTATitle>Готов начать свой путь видеомейкера?</CTATitle>
      <CTAText>
        Присоединяйся к тысячам студентов, которые уже создают потрясающий контент. 
        Курс полностью бесплатный!
      </CTAText>
      <CTAButton onClick={handleClick}>
        Записаться на курс
      </CTAButton>
    </CTAContainer>
  );
};

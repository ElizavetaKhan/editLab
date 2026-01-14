import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  50% {
    box-shadow: 0 0 0 20px rgba(99, 102, 241, 0);
  }
`;

const ButtonContainer = styled.button`
  cursor: pointer;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 18px 48px;
  font-size: 18px;
  font-weight: 700;
  font-family: inherit;
  align-self: center;
  margin-top: 50px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(99, 102, 241, 0.4);
    
    &::before {
      width: 300px;
      height: 300px;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  span {
    position: relative;
    z-index: 1;
  }
`;

export const ButtonReg = ({ clickNumber, setClickNumber, onClick }) => {
  const handleClick = () => {
    setClickNumber(clickNumber + 1);
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
    <ButtonContainer onClick={handleClick}>
      <span>Записаться бесплатно</span>
    </ButtonContainer>
  );
};

import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border-radius: 30px;
  margin: 40px 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
    animation: ${fadeInUp} 3s ease-in-out infinite alternate;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 800;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;
  z-index: 1;
  line-height: 1.2;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(18px, 2.5vw, 24px);
  color: #4a5568;
  margin-bottom: 40px;
  max-width: 700px;
  line-height: 1.6;
  animation: ${fadeInUp} 1s ease-out;
  position: relative;
  z-index: 1;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 60px;
  animation: ${fadeInUp} 1.2s ease-out;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  min-width: 150px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #718096;
  margin-top: 8px;
  text-align: center;
`;

export const HeroSection = ({ clickNumber }) => {
  return (
    <HeroContainer>
      <HeroTitle>EditLab — курс по видеомонтажу</HeroTitle>
      <HeroSubtitle>
        Научись монтировать видео профессионально — от клипов до YouTube-шоу. 
        Стань востребованным видеомейкером и создавай контент, который покоряет миллионы
      </HeroSubtitle>
      <StatsContainer>
        <StatItem>
          <StatNumber>1000+</StatNumber>
          <StatLabel>Участников</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>50+</StatNumber>
          <StatLabel>Уроков</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{clickNumber}</StatNumber>
          <StatLabel>Записались сегодня</StatLabel>
        </StatItem>
      </StatsContainer>
    </HeroContainer>
  );
};

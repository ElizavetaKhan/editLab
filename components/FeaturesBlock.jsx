import React from 'react';
import styled from 'styled-components';

const FeaturesContainer = styled.section`
  padding: 80px 20px;
  margin: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  border-radius: 24px;
  padding: 40px 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(99, 102, 241, 0.2);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 36px;
  color: white;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
`;

const FeatureTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #2d3748;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #4a5568;
  line-height: 1.6;
`;

const HighlightText = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;

const features = [
  {
    icon: '🎬',
    title: 'Профессиональные видеомейкеры',
    description: 'Уроки от практикующих специалистов с опытом работы с крупными брендами'
  },
  {
    icon: '💼',
    title: 'Практика в каждом модуле',
    description: 'Каждый урок включает практические задания для закрепления навыков'
  },
  {
    icon: '📁',
    title: 'Готовое портфолио',
    description: 'После окончания курса у тебя будет портфолио из 10+ работ'
  },
  {
    icon: '👥',
    title: 'Активное сообщество',
    description: 'Присоединяйся к сообществу единомышленников и развивайся вместе'
  },
  {
    icon: '🎓',
    title: 'Сертификат',
    description: 'Получи сертификат, подтверждающий твои навыки видеомонтажа'
  },
  {
    icon: '⚡',
    title: 'Быстрый старт',
    description: 'Начни создавать первые проекты уже через неделю после старта'
  }
];

export const FeaturesBlock = ({ clickNumber }) => {
  const updatedFeatures = features.map((feature, index) => {
    if (index === 3) {
      return {
        ...feature,
        description: `Нас выбрали уже ${clickNumber} человек! Присоединяйся к сообществу единомышленников и развивайся вместе`
      };
    }
    return feature;
  });

  return (
    <FeaturesContainer>
      <SectionTitle>Почему EditLab?</SectionTitle>
      <FeaturesGrid>
        {updatedFeatures.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesContainer>
  );
};

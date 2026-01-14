import React from 'react';
import styled from 'styled-components';

const ProgramContainer = styled.section`
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

const ModulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ModuleCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  border-radius: 20px;
  padding: 32px 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 40px;
  border-left: 5px solid;
  
  &:hover {
    transform: translateX(8px);
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
  }
  
  &:nth-child(1) {
    border-left-color: #667eea;
  }
  &:nth-child(2) {
    border-left-color: #f093fb;
  }
  &:nth-child(3) {
    border-left-color: #4facfe;
  }
  &:nth-child(4) {
    border-left-color: #43e97b;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

const ModuleNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  flex-shrink: 0;
`;

const ModuleNumber = styled.div`
  font-size: 48px;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  ${ModuleCard}:nth-child(2) & {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  ${ModuleCard}:nth-child(3) & {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  ${ModuleCard}:nth-child(4) & {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ModuleNumberLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #a0aec0;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ModuleContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModuleHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ModuleTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #2d3748;
`;

const ModuleDescription = styled.p`
  font-size: 16px;
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
`;

const ModuleFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const ModuleFeature = styled.li`
  font-size: 14px;
  color: #718096;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  position: relative;
  padding-left: 32px;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 12px;
    color: #48bb78;
    font-weight: bold;
  }
`;

const modules = [
  {
    number: '01',
    title: 'Основы видеомонтажа',
    description: 'Изучи интерфейс программ, работу с таймлайном и базовые инструменты',
    features: ['Знакомство с Premiere Pro', 'Работа с клипами', 'Базовые эффекты', 'Цветокоррекция']
  },
  {
    number: '02',
    title: 'Продвинутые техники',
    description: 'Освой продвинутые эффекты, переходы и работу со звуком',
    features: ['Сложные переходы', 'Motion Graphics', 'Звуковой дизайн', 'Стабилизация']
  },
  {
    number: '03',
    title: 'Стилизация и брендинг',
    description: 'Научись создавать уникальный стиль и работать с брендбуком',
    features: ['Цветовые схемы', 'Типографика', 'Логотипы и графика', 'Фирменный стиль']
  },
  {
    number: '04',
    title: 'Портфолио и карьера',
    description: 'Собери портфолио и узнай, как начать карьеру видеомейкера',
    features: ['Сборка портфолио', 'Поиск клиентов', 'Ценообразование', 'Продвижение']
  }
];

export const ProgramBlock = () => {
  return (
    <ProgramContainer>
      <SectionTitle>Программа курса</SectionTitle>
      <ModulesList>
        {modules.map((module, index) => (
          <ModuleCard key={index}>
            <ModuleNumberContainer>
              <ModuleNumber>{module.number}</ModuleNumber>
              <ModuleNumberLabel>Модуль</ModuleNumberLabel>
            </ModuleNumberContainer>
            <ModuleContent>
              <ModuleHeader>
                <ModuleTitle>{module.title}</ModuleTitle>
                <ModuleDescription>{module.description}</ModuleDescription>
              </ModuleHeader>
              <ModuleFeatures>
                {module.features.map((feature, idx) => (
                  <ModuleFeature key={idx}>{feature}</ModuleFeature>
                ))}
              </ModuleFeatures>
            </ModuleContent>
          </ModuleCard>
        ))}
      </ModulesList>
    </ProgramContainer>
  );
};

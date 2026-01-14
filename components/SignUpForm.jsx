import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FormContainer = styled.section`
  padding: 80px 20px;
  margin: 40px 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);
  border-radius: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const FormTitle = styled.h3`
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  margin-bottom: 16px;
  color: #2d3748;
`;

const FormSubtitle = styled.p`
  font-size: 16px;
  color: #718096;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const InputBlock = styled.input`
  flex: 1;
  padding: 16px 20px;
  font-size: 16px;
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

const ButtonSend = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (min-width: 640px) {
    flex-shrink: 0;
  }
`;

const SuccessMessage = styled.div`
  padding: 24px;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  animation: ${fadeIn} 0.5s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const SuccessIcon = styled.span`
  font-size: 24px;
`;

export const SignUpForm = ({ submitted, handleSubmit, setEmail, email }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <FormContainer id="signup-form">
      <FormTitle>Запишись на курс</FormTitle>
      <FormSubtitle>
        Оставь email, чтобы записаться на бесплатный курс по видеомонтажу
      </FormSubtitle>
      {submitted ? (
        <SuccessMessage>
          <SuccessIcon>✅</SuccessIcon>
          Спасибо! Мы свяжемся с вами в ближайшее время
        </SuccessMessage>
      ) : (
        <FormSection as="form" onSubmit={handleFormSubmit}>
          <InputBlock
            as="input"
            type="email"
            placeholder="Введите ваш email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ButtonSend as="button" type="submit">
            Отправить
          </ButtonSend>
        </FormSection>
      )}
    </FormContainer>
  );
};

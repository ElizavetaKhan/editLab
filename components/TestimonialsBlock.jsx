import React from 'react';
import styled from 'styled-components';

const TestimonialsContainer = styled.section`
  padding: 80px 20px;
  margin: 40px 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
  border-radius: 30px;
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

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(99, 102, 241, 0.15);
  }
  
  &::before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 30px;
    font-size: 80px;
    color: rgba(99, 102, 241, 0.1);
    font-family: Georgia, serif;
    line-height: 1;
  }
`;

const TestimonialText = styled.p`
  font-size: 16px;
  color: #2d3748;
  line-height: 1.7;
  margin-bottom: 24px;
  font-style: italic;
  position: relative;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 20px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: #2d3748;
  font-size: 16px;
`;

const AuthorRole = styled.div`
  font-size: 14px;
  color: #718096;
`;

const testimonials = [
  {
    text: 'Курс изменил мою карьеру! Теперь я работаю с крупными брендами и создаю контент, которым горжусь. Преподаватели объясняют очень доступно.',
    name: 'Анна Петрова',
    role: 'Видеомейкер, YouTube'
  },
  {
    text: 'Отличная программа! Особенно понравились практические задания. После курса сразу получил первые заказы и собрал портфолио.',
    name: 'Максим Иванов',
    role: 'Freelance видеомейкер'
  },
  {
    text: 'Лучший курс по монтажу! Все структурировано, понятно, и есть поддержка сообщества. Рекомендую всем, кто хочет развиваться в этой сфере.',
    name: 'Елена Соколова',
    role: 'Контент-мейкер'
  }
];

export const TestimonialsBlock = () => {
  return (
    <TestimonialsContainer>
      <SectionTitle>Отзывы выпускников</SectionTitle>
      <TestimonialsGrid>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <TestimonialText>{testimonial.text}</TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>{testimonial.name.charAt(0)}</AuthorAvatar>
              <AuthorInfo>
                <AuthorName>{testimonial.name}</AuthorName>
                <AuthorRole>{testimonial.role}</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </TestimonialsContainer>
  );
};

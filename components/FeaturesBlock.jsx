import React from 'react'
import styled from 'styled-components';

const H2Section = styled.h2`
    font-size: 30px;
`;

const UlStyled = styled.ul`
    list-style: none;
    padding: 0;
    font-size: 16px;
`;

const LiStyled = styled.li`
    margin-top: 15px;
`;

export const FeaturesBlock = ({clickNumber}) => {
    return (
        <section>
            <H2Section>Почему EditLab?</H2Section>
            <UlStyled>
                <LiStyled>Уроки от профессиональных видеомейкеров</LiStyled>
                <LiStyled>Практика в каждом модуле</LiStyled>
                <LiStyled>Портфолио после окончания курса</LiStyled>
                <LiStyled>Нас выбрали уже {clickNumber} человек!</LiStyled>
            </UlStyled>
        </section>
    )
};
import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
    cursor: pointer;
    background-color: #ff4757;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 30px;
    font-family: inherit;
    align-self: center;
    margin-top: 50px;
`;

export const ButtonReg = ({clickNumber, setClickNumber}) => {
    return (
        <ButtonContainer onClick = {() => setClickNumber(clickNumber+1)} >
            Записаться бесплатно
        </ButtonContainer>
    );
};
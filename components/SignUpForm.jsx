import React from 'react'
import styled from 'styled-components';

const InputBlock = styled.input`
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-right: 10px;
    font-family: inherit;
    width: 100%;
`;

const ButtonSend = styled.button`
    background-color: #2ed573;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-family: inherit;
`;

const FormSection = styled.form`
    display: flex;
`;

const SignUpSection = styled.section`
    align-self: center;
`;

export const SignUpForm = ({ submitted, handleSubmit, setEmail, email }) => {
    return (
        <SignUpSection>
            <h3>Оставь email, чтобы узнать старт курса первым</h3>
            {
                submitted 
                ? 
                    <p>✅ Спасибо! Мы свяжемся с Вами!</p>
                :
                    <FormSection onSubmit={handleSubmit}>
                        <InputBlock
                            type="email"
                            placeholder="Введите email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <ButtonSend type="submit">
                            Отправить
                        </ButtonSend>
                    </FormSection>
            }
        </SignUpSection>
    )
};
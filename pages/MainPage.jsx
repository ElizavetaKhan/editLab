import React, { useState } from 'react';
import { ButtonReg } from '../components/ButtonReg';
import styled from 'styled-components';
import { FeaturesBlock } from '../components/FeaturesBlock';
import { SignUpForm } from '../components/SignUpForm';

const MainPageContainer = styled.div`
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
    justify-content: space-between;
`;

const FooterSection = styled.footer`
    margin-top: 80px;
    color: #888;
    font-size: 14px;
    align-self: center;
`;

export const MainPage = () => {
    const [clickNumber, setClickNumber] = useState(0);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        setSubmitted(true);
    };

    return (
        <MainPageContainer>
            <section style={{ display: "flex", flexDirection: "column", alignSelf: "center" }}>
                <h1 style={{ fontSize: "50px", marginBottom: "10px" }}>EditLab — курс по видеомонтажу</h1>
                <p style={{ fontSize: "18px", marginBottom: "20px", textAlign: "center" }}>
                    Научись монтировать видео профессионально — от клипов до YouTube-шоу.
                </p>

            <ButtonReg
                clickNumber={clickNumber}
                setClickNumber={setClickNumber}
            />

            </section>

            <FeaturesBlock clickNumber={clickNumber} />

            <SignUpForm
                handleSubmit={handleSubmit}
                submitted={submitted}
                email={email}
                setEmail={setEmail}
            />

            <FooterSection>
                © 2025 EditLab — курс по видеомонтажу
            </FooterSection>
        </MainPageContainer>
    );
};

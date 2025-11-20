import React from 'react';
import MainPage from '../pages/MainPage';
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 3% 0;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f9ff 0%, #dde6ff 100%);
    font-family: 'Montserrat', sans-serif;
  }
`;



/**
 * Main component, that is connected to index.js
 */

export const App = () => {
    return (
        <>
            <GlobalStyle />
            <MainPage/>
        </>
    );
};

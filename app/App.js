import React from 'react';
import MainPage from '../pages/MainPage';
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f9ff 0%, #dde6ff 50%, #f5f0ff 100%);
    background-attachment: fixed;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2d3748;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  html {
    scroll-behavior: smooth;
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

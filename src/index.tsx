import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from "./styles/global-styles";
import { theme } from "./styles/theme";
import * as dotenv from "dotenv";


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
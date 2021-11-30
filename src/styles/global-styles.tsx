
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

// reset css by normalize
const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
    font-family: 'Open Sans', sans-serif; 
  }
`;

export default GlobalStyle;
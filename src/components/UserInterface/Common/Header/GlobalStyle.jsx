import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'BMHANNAAir';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/BMHANNAAir.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'BMHANNAAir', sans-serif;
  }
`;

export default GlobalStyle;

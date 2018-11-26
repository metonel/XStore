import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import Header from "./Header";
import Meta from "./Meta";

const themeAici = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)" //box shadow
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

//partea interioara sa nu se extinda pana in margine daca e o fereastra mare
const Inner = styled.div`
  max-width: ${props =>
    props.theme
      .maxWidth}; /*theme transmit de ThemeProvider, care ii legat de themeAici*/
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
@font-face {
  font-family: 'radnika_next';
  src: url('/static/radnikanext-medium-webfont.woff2')format('woff2');
  font-weight: normal;
  font-style: normal;
}
html {
  box-sizing: border-box;
  font-size: 10px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  padding: 0;
  margin: 0;
  font-size: 1.5rem; /*asta vine 15px pt ca am setat fontu paginii la 10 in styled pt html*/
  line-height: 2;
  font-family: 'radnika_next'; /*asta merge pt ca @font-face*/
}

a {
  text-decoration: none;
  color: ${
    themeAici.black
  };/*nu suntem in ThemeProvider sa putem sa accesam ${props =>
  props.theme
    .black};, dar fiind in acelasi fisier cu variabila folosita ca theme, o putem accesa asa. daca variabila era in alt fisier trebuia sa importam fisieru prima data*/
}
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={themeAici}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;

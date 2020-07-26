import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import 'normalize.css';
import { colors, typography } from 'utils';

import Header from 'components/Header/Header';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    line-height: 1.4;
    background-color: ${colors.light};
    color: ${colors.dark};
  }
`;

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Layout = ({ children, locale }) => {
  return (
    <>
      <ThemeProvider theme={{ ...colors, ...typography }}>
        <GlobalStyle />
        <Wrapper>
          <Header locale={locale} />
          <main>{children}</main>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.oneOf(['pl', 'en']).isRequired,
};

export default Layout;

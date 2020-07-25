import React from 'react';
import styled, { css } from 'styled-components';
import { motion, useCycle } from 'framer-motion';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Location } from '@reach/router';
import PropTypes from 'prop-types';
import { media } from 'utils';

import Hamburger from 'components/Hamburger/Hamburger';
import Sidebar from 'components/Sidebar/Sidebar';

const StyledHeader = styled.header`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${media.tablet`
  padding: 2rem 2.5rem;
  `}
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: none;
  flex-direction: row;
  align-items: center;

  ${media.tablet`
    display: flex;
  `}
`;

const StyledLink = styled(Link)`
  padding: 0.5rem;
  margin: 0;
  margin-right: 2rem;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.dark};
`;

const LangToggle = styled(Link)`
  position: relative;
  z-index: 10;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.dark};
  white-space: nowrap;
`;

const Lang = styled.span`
  ${({ theme, isBold }) =>
    isBold &&
    css`
      font-weight: ${theme.fontWeight.bold};
    `}
`;

const Header = ({ locale }) => {
  const prefix = locale === 'pl' ? '' : '/en';
  return (
    <StyledHeader>
      <List>
        <li>
          <StyledLink to={`${prefix}/`}>pawłowskiArt</StyledLink>
        </li>
        <li>
          <StyledLink to={`${prefix}/shop`}>
            {locale === 'pl' ? 'sklep' : 'shop'}
          </StyledLink>
        </li>
        <li>
          <StyledLink to={`${prefix}/about`}>
            {locale === 'pl' ? 'o mnie' : 'about me'}
          </StyledLink>
        </li>
        <li>
          <StyledLink to={`${prefix}/portfolio`}>portfolio</StyledLink>
        </li>
        <li>
          <StyledLink to={`${prefix}/contact`}>
            {locale === 'pl' ? 'kontakt' : 'contact'}
          </StyledLink>
        </li>
      </List>
      <Sidebar prefix={prefix} locale={locale} />
      <Location>
        {({ location: { pathname } }) => {
          const path = pathname.includes('/en')
            ? pathname.replace('/en', '')
            : `/en${pathname}`;
          return (
            <LangToggle to={path}>
              <Lang isBold={locale === 'pl'}>PL </Lang>/
              <Lang isBold={locale === 'en'}> EN</Lang>
            </LangToggle>
          );
        }}
      </Location>
    </StyledHeader>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;

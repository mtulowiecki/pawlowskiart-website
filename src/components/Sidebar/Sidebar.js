import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, useCycle } from 'framer-motion';
import { Link } from 'gatsby';
import { media } from 'utils';

import Hamburger from 'components/Hamburger/Hamburger';

const Wrapper = styled(motion.div)`
  display: block;

  ${media.tablet`
  display:none;
  `}
`;

const SidebarWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.light};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const StyledLink = styled(Link)`
  position: relative;
  padding: 0.5rem;
  margin: 0.5rem 0;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.dark};
`;

const Sidebar = ({ prefix, locale }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const variants = {
    closed: {
      x: '-100%',
    },
    open: {
      x: '0',
    },
  };
  return (
    <Wrapper initial="closed" animate={isOpen ? 'open' : 'closed'}>
      <Hamburger toggle={toggleOpen} />
      <SidebarWrapper
        variants={variants}
        transition={{ ease: 'easeInOut', duration: 0.3 }}
      >
        <StyledLink to={`${prefix}/`}>logo</StyledLink>
        <StyledLink to={`${prefix}/shop`}>
          {locale === 'pl' ? 'sklep' : 'shop'}
        </StyledLink>
        <StyledLink to={`${prefix}/about`}>
          {locale === 'pl' ? 'o mnie' : 'about me'}
        </StyledLink>
        <StyledLink to={`${prefix}/portfolio`}>portfolio</StyledLink>
        <StyledLink to={`${prefix}/contact`}>
          {locale === 'pl' ? 'kontakt' : 'contact'}
        </StyledLink>
      </SidebarWrapper>
    </Wrapper>
  );
};

Sidebar.propTypes = {
  prefix: PropTypes.string.isRequired,
  locale: PropTypes.oneOf(['pl', 'en']),
};

Sidebar.defaultProps = {
  locale: 'pl',
};

export default Sidebar;

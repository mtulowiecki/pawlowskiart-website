import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.button)`
  padding: 0.5rem;
  height: 2.5rem;
  width: 2.5rem;
  position: relative;
  z-index: 10;
  border: none;
  background-color: ${({ theme }) => theme.light};
  cursor: pointer;
`;

const StyledPath = styled(motion.path)`
  stroke: ${({ theme }) => theme.secondary};
`;

const Hamburger = ({ toggle, className }) => {
  const pathTransition = {};

  return (
    <Wrapper name="navigation" onTap={toggle} className={className}>
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <g>
          <StyledPath
            d="M 4,4 l 12 0"
            stroke-width="3"
            stroke="currentColor"
            stroke-linecap="round"
            variants={{
              closed: { d: 'M 4,4 l 12 0' },
              open: { d: 'M 4,4 l 12 12' },
            }}
            transition={pathTransition}
          />
          <StyledPath
            stroke-width="3"
            stroke="currentColor"
            stroke-linecap="round"
            variants={{
              closed: { d: 'M 4,10 l 12 0' },
              open: { d: 'M 4,16 l 12 -12' },
            }}
            transition={pathTransition}
          />
          <StyledPath
            stroke-width="3"
            stroke="currentColor"
            stroke-linecap="round"
            variants={{
              closed: { d: 'M 16,16 l -12 0' },
              open: { d: 'M 16,16 l -12 -12' },
            }}
            transition={pathTransition}
          />
        </g>
      </svg>
    </Wrapper>
  );
};

export default Hamburger;

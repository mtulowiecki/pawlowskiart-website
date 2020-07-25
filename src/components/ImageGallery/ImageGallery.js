import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Img from 'gatsby-image';
import { media } from 'utils';

import arrow from 'assets/icons/arrow.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LeftCol = styled.div`
  display: none;

  ${media.tablet`
  display: block;
  flex-basis: 18%;
  `}
`;

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 35rem;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  overflow: auto;
`;

const SideImage = styled(motion.div)`
  scroll-snap-align: start;
  margin-bottom: 1rem;
  height: 10rem;
  cursor: pointer;
`;

const MainImage = styled(motion.div)`
  position: relative;
  margin: 0 1rem;
  flex-basis: 82%;
`;

const Arrow = styled(motion.div)`
  display:block;
  height: 2rem;
  width: 2rem;
  position: absolute;
  top: 50%;
  background: url(${arrow}) no-repeat;
  background-size: 70% 70%;
  background-position: 50% 50%;
  background-color: ${({ theme }) => theme.light};

  ${({ left }) =>
    left &&
    css`
      left: 0;
    `}

  ${({ right }) =>
    right &&
    css`
      right: 0;
    `}

    ${media.tablet`
    display:none;
    `}
`;

const StyledImage = styled(Img)`
  width: auto;
  max-height: 100%;
  max-width: 100%;
`;

const ImageGallery = ({ images }) => {
  const [currentMainImage, setMainImage] = useState(0);
  const mainImageControls = useAnimation();
  const sideImageVariants = {
    active: {
      opacity: 1,
      borderBottom: 'solid black 5px',
    },
    inactive: { opacity: 0.9, borderBottom: 'solid black 0px' },
  };

  const handleChange = async index => {
    if (currentMainImage != index) {
      await mainImageControls.start({ opacity: 0 });
      setMainImage(index);
      await mainImageControls.start({ opacity: 1 });
    }
  };

  return (
    <Wrapper>
      <LeftCol>
        <SideWrapper>
          {images.map((image, index) => {
            const isCurrent = index === currentMainImage ? true : false;
            return (
              <SideImage
                key={image.originalId}
                onClick={() => handleChange(index)}
                isCurrent={isCurrent}
                initial={isCurrent ? 'active' : 'inactive'}
                animate={isCurrent ? 'active' : 'inactive'}
                variants={sideImageVariants}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
              >
                <StyledImage fluid={image.fluid} />
              </SideImage>
            );
          })}
        </SideWrapper>
      </LeftCol>
      <MainImage animate={mainImageControls} transition={{ duration: 0.1 }}>
        <StyledImage fluid={images[currentMainImage].fluid} />
        <AnimatePresence>
          {currentMainImage > 0 && (
            <Arrow
              left
              onTap={() => handleChange(currentMainImage - 1)}
              initial={{ x: '-32', opacity: 0 }}
              animate={{ x: '0', opacity: 0.7 }}
              exit={{ x: '-32', opacity: 0 }}
            />
          )}
          {currentMainImage < images.length - 1 && (
            <Arrow
              right
              onTap={() => handleChange(currentMainImage + 1)}
              initial={{ x: '32', opacity: 0 }}
              animate={{ x: '0', opacity: 0.7 }}
              exit={{ x: '32', opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </MainImage>
    </Wrapper>
  );
};

export default ImageGallery;

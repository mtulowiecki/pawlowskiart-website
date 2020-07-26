import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from '@popmotion/popcorn';
import { media } from 'utils';

import rightArrow from 'assets/icons/right-arrow.svg';

const Wrapper = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.tablet`
  align-items: flex-start;
  `}
`;

const SideWrapper = styled.aside`
  display: none;
  flex-direction: column;
  height: 55vh;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  overflow: auto;

  ${media.tablet`
  display: flex;
  `}
`;
const SideImage = styled(motion.img)`
  scroll-snap-align: start;
  margin-bottom: 1rem;
  height: 20vh;
  cursor: pointer;
`;

const MainImageWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 1rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainImage = styled(motion.img)`
  position: absolute;
  display: block;
  max-height: 100%;
  max-width: 100%;
`;

const ArrowButton = styled.button`
  display: block;
  height: 1.75rem;
  width: 1.75rem;
  position: absolute;
  z-index: 2;
  top: 50%;
  border: none;
  background: url(${rightArrow}) no-repeat;
  background-size: 100% 100%;
  background-position: 50% 50%;
  fill: ${({ theme }) => theme.gray};

  ${({ left }) =>
    left &&
    css`
      left: 0;
      transform: scaleX(-1);
    `}
  ${({ right }) =>
    right &&
    css`
      right: 0;
    `}

  &:focus {
    outline: none;
  }

  ${media.tablet`
    display:none;
    `}
`;

const ImageGallery = ({ images }) => {
  const [[mainImage, direction], setMainImage] = useState([0, 0]);

  const mainImageIndex = wrap(0, images.length, mainImage);
  const sideImageVariants = {
    active: {
      opacity: 1,
      borderBottom: 'solid black 5px',
    },
    inactive: { opacity: 0.9, borderBottom: 'solid black 0px' },
  };

  const mainImageVariants = {
    enter: direction => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: direction => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const paginate = newDirection => {
    setMainImage([mainImage + newDirection, newDirection]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <Wrapper>
      <SideWrapper>
        {images.map((image, index) => {
          const isCurrent = index === mainImageIndex;
          const direction = index < mainImageIndex ? 1 : -1;
          return (
            <SideImage
              src={image.url}
              key={image.originalId}
              onClick={() => setMainImage([index, direction])}
              initial={isCurrent ? 'active' : 'inactive'}
              animate={isCurrent ? 'active' : 'inactive'}
              variants={sideImageVariants}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
          );
        })}
      </SideWrapper>
      <MainImageWrapper>
        <AnimatePresence initial={false} custom={direction}>
          <MainImage
            key={mainImageIndex}
            src={images[mainImageIndex].url}
            custom={direction}
            variants={mainImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: 'spring', stiffness: 200, damping: 500 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </AnimatePresence>
        <ArrowButton
          left
          key="left"
          name="previous-image"
          onClick={() => paginate(-1)}
        />
        <ArrowButton
          right
          key="right"
          name="next-image"
          onClick={() => paginate(1)}
        />
      </MainImageWrapper>
    </Wrapper>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled(Link)`
  max-width: 250px;
  text-decoration: none;
  color: ${({ theme }) => theme.dark};
  justify-self: center;
`;

const CardImage = styled.img`
  max-width: 100%;
`;

const CardBody = styled.div`
  padding: 0.5rem 0.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h4`
  margin: 0;
  flex-basis: 110px;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Price = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const ProductPreview = ({ path, title, image, price }) => (
  <Wrapper to={path}>
    <CardImage src={image[0].url} />
    <CardBody>
      <Title>{title}</Title>
      <Price>{price}</Price>
    </CardBody>
  </Wrapper>
);

export default ProductPreview;

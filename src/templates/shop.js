import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { media } from 'utils';

import Layout from 'layouts/Layout';
import SEO from 'components/SEO/SEO';
import ProductPreview from 'components/ProductPreview/ProductPreview';

const Wrapper = styled.div`
  padding: 1rem;
  height: 100%;
  width: 100%;

  ${media.tablet`
  padding: 3rem 5rem;
  `}
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.dark};
`;

const Paragraph = styled.p`
  max-width: 450px;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.dark};
`;

const ProductsWrapper = styled.div`
  padding: 2.5rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem;

  ${media.tablet`
  grid-template-columns: repeat(3, 1fr);
  `}
`;

const ShopPage = ({
  data: {
    datoCmsShopPage: { pageTitle, pageParagraph },
    allDatoCmsProduct: { nodes },
  },
  pageContext: { locale },
}) => (
  <Layout locale={locale}>
    <SEO title="Contact" />
    <Wrapper>
      <Title>{pageTitle}</Title>
      <Paragraph>{pageParagraph}</Paragraph>
      <ProductsWrapper>
        {nodes.map(({ title, image, price, originalId }) => {
          const prefix = locale === 'pl' ? '' : '/en';
          return (
            <ProductPreview
              path={`${prefix}/shop/${originalId}`}
              title={title}
              image={image}
              price={price}
              key={originalId}
            />
          );
        })}
      </ProductsWrapper>
    </Wrapper>
  </Layout>
);

export const query = graphql`
  query ShopQuery($locale: String!) {
    datoCmsShopPage(locale: { eq: $locale }) {
      pageTitle
      pageParagraph
    }
    allDatoCmsProduct(filter: { locale: { eq: $locale } }) {
      nodes {
        title
        price
        originalId
        image {
          url
        }
      }
    }
  }
`;

export default ShopPage;
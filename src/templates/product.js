import React from 'react';
import { graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import { media } from 'utils';

import Layout from 'layouts/Layout';
import SEO from 'components/SEO/SEO';
import ImageGallery from 'components/ImageGallery/ImageGallery';

const Wrapper = styled.div`
  padding: 1rem;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  ${media.tablet`
  padding: 3rem 5rem;
  `}
`;

const ImageGalleryWrapper = styled.div`
  flex: 0 1 550px;
`;

const ContentWrapper = styled.div`
  flex: 0 1 550px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Price = styled.p`
  margin: 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSize.l};
`;

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};

  ${({ theme, bold }) =>
    bold &&
    css`
      font-weight: ${theme.fontWeight.bold};
    `}
`;

const Detail = styled.div`
  border-bottom: solid ${({ theme }) => theme.gray} 1px;
  display: flex;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 2rem;
  }
`;

const Phone = styled.div`
  margin: 4rem 0;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const ProductPage = ({
  data: {
    datoCmsProduct: { title, description, price, details, image },
    datoCmsContactPage: { phoneNumber },
  },
  pageContext: { locale },
}) => (
  <Layout locale={locale}>
    <SEO title="Contact" />
    <Wrapper>
      <ImageGalleryWrapper>
        <ImageGallery images={image} />
      </ImageGalleryWrapper>
      <ContentWrapper>
        <div>
          <Title>{title}</Title>
          <Price>{price}</Price>
          <Paragraph>{description}</Paragraph>
          <Phone>{phoneNumber}</Phone>
          <Detail>
            <Paragraph bold>
              {locale === 'pl' ? 'Szczegóły' : 'Details'}
            </Paragraph>
          </Detail>
          {details.map(({ detailName, detail }) => (
            <Detail key={detailName}>
              <Paragraph>{detailName}</Paragraph>
              <Paragraph>{detail}</Paragraph>
            </Detail>
          ))}
        </div>
      </ContentWrapper>
    </Wrapper>
  </Layout>
);

export const query = graphql`
  query ProductQuery($locale: String!, $originalId: String!) {
    datoCmsProduct(originalId: { eq: $originalId }, locale: { eq: $locale }) {
      title
      description
      price
      details {
        detailName
        detail
      }
      image {
        url
        originalId
      }
    }
    datoCmsContactPage {
      phoneNumber
    }
  }
`;

// image {
//   fluid(maxWidth: 300) {
//     ...GatsbyDatoCmsFluid_noBase64
//   }

export default ProductPage;

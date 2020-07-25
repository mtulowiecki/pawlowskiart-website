import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { media } from 'utils';

import Layout from 'layouts/Layout';
import SEO from 'components/SEO/SEO';

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

const PortfolioPage = ({
  data: {
    datoCmsPortfolioPage: { pageTitle, pageParagraph },
  },
  pageContext: { locale },
}) => (
  <Layout locale={locale}>
    <SEO title="Contact" />
    <Wrapper>
      <Title>{pageTitle}</Title>
      <Paragraph>{pageParagraph}</Paragraph>
    </Wrapper>
  </Layout>
);

export const query = graphql`
  query PortfolioQuery($locale: String!) {
    datoCmsPortfolioPage(locale: { eq: $locale }) {
      pageTitle
      pageParagraph
    }
  }
`;

export default PortfolioPage;

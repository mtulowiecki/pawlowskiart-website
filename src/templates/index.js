import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { media } from 'utils';

import Layout from 'layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled.div`
  height: 100%;
  max-width: 100vw;
  display: grid;
  grid-template: repeat(4, auto) / 2rem auto;
  align-items: center;

  ${media.tablet`
  grid-template: repeat(4, auto) / 4rem auto;
  `}

  ${media.laptop`
  grid-template: repeat(3, auto) / 4fr 6fr;
  `}
`;

const TextWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #0a0a0a;
  color: ${({ theme }) => theme.light};
  grid-row: 2;
  grid-column: 2;

  ${media.laptop`
  text-align: right;
  grid-column: 1;
  `}
`;

const Name = styled.h2`
  margin: 0;
  max-width: 250px;

  font-size: ${({ theme }) => theme.fontSize.xl};

  ${media.laptop`
  max-width: none;
    font-size: ${({ theme }) => theme.fontSize.xxxl};
  `}
`;

const Paragraph = styled.p`
  min-width: 200px;
  margin: 0;
  text-align: right;
`;

const StyledImage = styled(Img)`
  height: 100%;
  width: 100%;
  grid-row: 3;
  grid-column: 2;

  ${media.laptop`
    grid-row: 2;
    grid-column: 2
  `}
`;

const IndexPage = ({
  data: {
    datoCmsHomePage: { name, paragraph },
    file: {
      childImageSharp: { fluid },
    },
  },
  pageContext: { locale },
}) => (
  <Layout locale={locale}>
    <SEO title="Home" />
    <Wrapper>
      <TextWrapper>
        <Name>{name}</Name>
        <Paragraph>{paragraph}</Paragraph>
      </TextWrapper>
      <StyledImage
        fluid={fluid}
        imgStyle={{ objectPosition: '0 50%' }}
        backgroundColor="#0A0A0A"
        objectPosition="0 50%"
      />
    </Wrapper>
  </Layout>
);

export const query = graphql`
  query MyQuery($locale: String!) {
    datoCmsHomePage(locale: { eq: $locale }) {
      name
      paragraph
    }
    file(name: { regex: "/hero-image/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

export default IndexPage;

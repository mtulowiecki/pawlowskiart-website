import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { media } from 'utils';

import Layout from 'layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled.div`
  height: 100%;
  max-height: calc (100vh - 1rem);
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
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #000000;
  color: ${({ theme }) => theme.light};
  grid-row: 2;
  grid-column: 2;

  ${media.laptop`
  text-align: right;
  align-items: stretch;
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
      <StyledImage fluid={fluid} backgroundColor="#000000" />
    </Wrapper>
  </Layout>
);

export const query = graphql`
  query IndexQuery($locale: String!) {
    datoCmsHomePage(locale: { eq: $locale }) {
      name
      paragraph
    }
    file(name: { regex: "/hero-image/" }) {
      childImageSharp {
        fluid(maxHeight: 500) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.shape({
    datoCmsHomePage: PropTypes.shape({
      name: PropTypes.string.isRequired,
      paragraph: PropTypes.string.isRequired,
    }).isRequired,
    file: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        // eslint-disable-next-line react/forbid-prop-types
        fluid: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.oneOf(['pl', 'en']).isRequired,
  }).isRequired,
};

export default IndexPage;

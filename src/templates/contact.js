import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { media } from 'utils';

import Layout from 'layouts/Layout';
import SEO from 'components/SEO/SEO';

const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

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

const InfoWrapper = styled.div`
  position: relative;
  padding: 1rem 0;
  margin: 3.5rem 0 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: -5rem;
    width: 120%;
    border: solid ${({ theme }) => theme.gra} 1px;

    ${media.laptop`
    width: 60%;
    `}
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

const Info = styled.p`
  margin: 0.75rem 0;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.dark};

  ${media.tablet`
  font-size: ${({ theme }) => theme.fontSize.l};
  `}
`;

const ImageWrapper = styled.div`
  display: none;

  ${media.laptop`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  z-index: 1;
`}
`;

const Image = styled(Img)`
  height: 100vh;
`;

const ContactPage = ({
  data: {
    datoCmsContactPage: {
      title,
      paragraph,
      name,
      phoneNumber,
      emailAdress,
      streetAdress,
      postcodeAdress,
    },
    file: {
      childImageSharp: { fluid },
    },
  },
  pageContext: { locale },
}) => (
  <Layout locale={locale}>
    <SEO title={title} />
    <Wrapper>
      <Title>{title}</Title>
      <Paragraph>{paragraph}</Paragraph>
      <InfoWrapper>
        <Info>{name}</Info>
        <Info>{phoneNumber}</Info>
        <Info>{emailAdress}</Info>
        <Info>{streetAdress}</Info>
        <Info>{postcodeAdress}</Info>
      </InfoWrapper>
      <ImageWrapper>
        <Image fluid={fluid} />
      </ImageWrapper>
    </Wrapper>
  </Layout>
);

export const query = graphql`
  query ContactQuery($locale: String!) {
    datoCmsContactPage(locale: { eq: $locale }) {
      title
      paragraph
      name
      phoneNumber
      emailAdress
      streetAdress
      postcodeAdress
    }
    file(name: { regex: "/contact-image/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

ContactPage.propTypes = {
  data: PropTypes.shape({
    datoCmsContactPage: PropTypes.shape({
      title: PropTypes.string.isRequired,
      paragraph: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      emailAdress: PropTypes.string.isRequired,
      streetAdress: PropTypes.string.isRequired,
      postcodeAdress: PropTypes.string.isRequired,
    }).isRequired,
    file: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.any.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.oneOf(['pl', 'en']).isRequired,
  }).isRequired,
};

export default ContactPage;

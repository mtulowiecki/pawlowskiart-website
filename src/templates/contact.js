import React from 'react';
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
  margin: 3.5rem 0 0;
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
      pageTitle,
      pageParagraph,
      name,
      phoneNumber,
      emailAdress,
      streetAdress,
      postcodeAdress,
    },
    file,
  },
  pageContext: { locale },
}) => (
  <Layout locale={locale}>
    <SEO title="Contact" />
    <Wrapper>
      <Title>{pageTitle}</Title>
      <Paragraph>{pageParagraph}</Paragraph>
      <InfoWrapper>
        <hr
          style={{
            transform: 'translateX(-5.5rem)',
            width: '200%',
          }}
        />
        <Info>{name}</Info>
        <Info>{phoneNumber}</Info>
        <Info>{emailAdress}</Info>
        <Info>{streetAdress}</Info>
        <Info>{postcodeAdress}</Info>
        <hr
          style={{
            transform: 'translateX(-5.5rem)',
            width: '200%',
          }}
        />
      </InfoWrapper>
      <ImageWrapper>
        <Image fluid={file.childImageSharp.fluid} />
      </ImageWrapper>
    </Wrapper>
  </Layout>
);

export const query = graphql`
  query ContactQuery($locale: String!) {
    datoCmsContactPage(locale: { eq: $locale }) {
      pageTitle
      pageParagraph
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

export default ContactPage;

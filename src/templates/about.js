import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled, { css } from 'styled-components';
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
  max-width: 600px;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.dark};

  ${({ isRotated }) =>
    isRotated &&
    css`
      width: 5rem;
      padding: 15rem 0;
      transform: rotate(-90deg);
    `}

  ${({ year }) =>
    year &&
    css`
      flex-basis: 300px;
      margin-right: 10rem;
    `}
`;

const ContentWrapper = styled.div`
  padding: 1.5rem 0;
  display: flex;
  align-items: stretch;
  justify-content: center;

  ${media.tablet`
  padding: 5rem 0;
  `}
`;

const LeftCol = styled.div`
  display: none;
  ${media.tablet`
  display:block;
  width: 5rem;
  display: flex;
  align-items: flex-start;
  border-right: solid ${({ theme }) => theme.gray} 1px;
  `}
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
`;

const YearWrapper = styled.div`
  position: relative;
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0%;
    width: 13rem;
    border-top: solid ${({ theme }) => theme.gray} 1px;
  }

  ${media.tablet`
  padding: 1rem 5rem 3.75rem;

  &::before {
    left: 7%;
  }
  `}
`;

const AboutPage = ({
  data: {
    datoCmsAboutPage: { title, paragraph, biography },
  },
  pageContext: { locale },
}) => (
  <Layout locale={locale}>
    <SEO title={title} />
    <Wrapper>
      <Title>{title}</Title>
      <Paragraph>{paragraph}</Paragraph>
      <ContentWrapper>
        <LeftCol>
          <Paragraph isRotated>
            {locale === 'pl' ? 'oś czasu' : 'timeline'}
          </Paragraph>
        </LeftCol>
        <RightCol>
          {biography.map(({ year, content }) => (
            <YearWrapper key={year}>
              <Paragraph year>{year}</Paragraph>
              <Paragraph>{content}</Paragraph>
            </YearWrapper>
          ))}
        </RightCol>
      </ContentWrapper>
    </Wrapper>
  </Layout>
);

export const query = graphql`
  query AboutQuery($locale: String!) {
    datoCmsAboutPage(locale: { eq: $locale }) {
      title
      paragraph
      biography {
        year
        content
      }
    }
  }
`;

AboutPage.propTypes = {
  data: PropTypes.shape({
    datoCmsAboutPage: PropTypes.shape({
      title: PropTypes.string,
      paragraph: PropTypes.string,
      biography: PropTypes.arrayOf(
        PropTypes.shape({
          year: PropTypes.number,
          content: PropTypes.content,
        })
      ),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.oneOf(['pl', 'en']).isRequired,
  }).isRequired,
};

export default AboutPage;

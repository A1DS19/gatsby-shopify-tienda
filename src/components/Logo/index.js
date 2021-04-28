import React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

export const Logo = () => {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "store.jpeg" }) {
        childImageSharp {
          fixed(width: 90) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `);

  return <Img fixed={data.file.childImageSharp.fixed} />;
};

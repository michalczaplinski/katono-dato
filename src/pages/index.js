import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";

const IndexPage = ({ data }) => (
  <div>
    {data.allDatoCmsClothingItem.edges.map(({ node: item }) => (
      <div key={item.id}>
        <figure>
          <Link to={`/items/${item.slug}`}>
            <Img sizes={item.coverImage.sizes} />
          </Link>
          <figcaption>
            <h6>
              <Link to={`/items/${item.slug}`}>{item.title}</Link>
            </h6>
          </figcaption>
        </figure>
      </div>
    ))}
  </div>
);

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsClothingItem(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          coverImage {
            sizes(maxWidth: 250, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;

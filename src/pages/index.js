import React from "react";
import PropTypes from "prop-types";
import { Grid, Box } from "../components/Grid";
import ItemCard from "../components/ItemCard";

const IndexPage = ({ transition, data }) => (
  <div style={transition && transition.style}>
    <Grid>
      {data.allDatoCmsClothingItem.edges.map(({ node: item }) => (
        <Box key={item.id}>
          <ItemCard item={item} />
        </Box>
      ))}
    </Grid>
  </div>
);

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsClothingItem(
      sort: { fields: [position], order: ASC }
      filter: { available: { eq: true } }
    ) {
      edges {
        node {
          id
          title
          slug
          description
          price
          size
          tags {
            id
            name
          }
          coverImage {
            sizes(maxWidth: 500, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;

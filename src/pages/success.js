import React from "react";
import { connect } from "react-redux";

const SuccessPage = ({
  cart,
  data: { allDatoCmsClothingItem: { edges: allItems } }
}) => <div> success </div>;

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps, null)(SuccessPage);

export const query = graphql`
  query SuccessQuery {
    allDatoCmsClothingItem(sort: { fields: [position], order: ASC }) {
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

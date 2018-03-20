import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const SuccessPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
`;

const Success = styled.p``;

const SuccessPage = ({
  cart,
  data: { allDatoCmsClothingItem: { edges: allItems } }
}) => (
  <SuccessPageContainer>
    <Success> THANK YOU FOR YOUR ORDER, {window.firstName}! </Success>
    <Success> THE TOTAL IS {window.total} Ksh </Success>
    <Success> DETAILS HAVE BEEN SENT TO YOUR EMAIL AT {window.email} </Success>
    <Success>
      PLEASE PAY WIHIN 48H OR WE WILL HAVE TO CANCEL YOUR ORDER :)
    </Success>
  </SuccessPageContainer>
);

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

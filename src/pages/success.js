import React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { navigateTo } from "gatsby-link";

import CartButton from "../components/CartButton";

const SuccessPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  color: #333333;
`;

const boldStyle = css`
  color: black;
  font-weight: bolder;
`;
const Name = styled.span`
  text-transform: uppercase;
`;
const Total = styled.span`
  ${boldStyle};
`;
const Email = styled.span`
  ${boldStyle};
`;

const SuccessPage = ({
  cart,
  data: { allDatoCmsClothingItem: { edges: allItems } }
}) => (
  <SuccessPageContainer>
    <h2>
      Thank you for your order,
      <Name> {window.clientDetails.firstName}</Name>!
    </h2>
    <span>
      The total is:
      <Total> {window.clientDetails.total} Ksh</Total>
    </span>
    <p>
      Details have been sent to your email:
      <Email> {window.clientDetails.email} </Email>
    </p>
    <p>PLEASE PAY WIHIN 48H OR WE WILL HAVE TO CANCEL YOUR ORDER :)</p>

    <CartButton onClick={() => navigateTo("/")}> 👈 SHOP MORE </CartButton>
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

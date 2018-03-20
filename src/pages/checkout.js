import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";

import CheckoutForm from "../components/CheckoutForm";

const CheckoutPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
`;

const CheckoutItems = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const YourItems = styled.p`
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
`;

const CheckoutItemContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 10px;
  overflow: hidden;
`;

const CheckoutImageLink = styled(Link)`
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-right: 5%;
`;

const TotalContainer = styled.div`
  display: block;
`;

const Total = styled.p`
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
`;

const TotalAmount = styled.p`
  display: inline-block;
  color: grey;
  font-style: italic;
`;

const CartPage = ({
  cart,
  removeItemFromCart,
  data: { allDatoCmsClothingItem: { edges: allItems } }
}) => {
  const itemsInCart = allItems.filter(item => cart.includes(item.node.id));
  const total = itemsInCart.reduce(
    (sum, { node: item }) => sum + item.price,
    0
  );
  return (
    <CheckoutPageContainer>
      <YourItems>YOUR STUFF:</YourItems>
      <CheckoutItems>
        {itemsInCart.map(({ node: item }) => (
          <CheckoutItemContainer key={item.id}>
            <CheckoutImageLink to={`/items/${item.slug}`}>
              <Img style={{}} sizes={item.coverImage.sizes} />
            </CheckoutImageLink>
          </CheckoutItemContainer>
        ))}
      </CheckoutItems>
      <TotalContainer>
        <Total>TOTAL:</Total>
        <TotalAmount>{total} KSh</TotalAmount>
        <CheckoutForm items={itemsInCart} total={total} />
      </TotalContainer>
    </CheckoutPageContainer>
  );
};

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = dispatch => ({
  removeItemFromCart: id => dispatch({ type: "REMOVE_ITEM_FROM_CART", id })
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

export const query = graphql`
  query CheckoutQuery {
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

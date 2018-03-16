import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";
import { CSSTransitionGroup } from "react-transition-group";

import trashIcon from "../static/trash.svg";

const CartPageContainer = styled.div`
  padding-top: 25px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
`;

const CartItemContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CartImageLink = styled(Link)`
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-right: 5%;
`;

const Size = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 5%;
`;

const Price = styled.p`
  color: grey;
  font-style: italic;
  margin-right: 5%;
`;

const RemoveButton = styled.div`
  height: 50px;
  width: 50px;
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  background-image: url(${trashIcon});
  cursor: pointer;
`;

const TotalContainer = styled.div`
  align-self: flex-end;
`;

const Total = styled.div``;

const CartPage = ({
  cart,
  removeItemFromCart,
  data: { allDatoCmsClothingItem: { edges: allItems } }
}) => {
  const itemsInCart = allItems.filter(item => cart.includes(item.node.id));

  return (
    <CartPageContainer>
      <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
      >
        {itemsInCart.map(({ node: item }) => (
          <CartItemContainer key={item.id}>
            <CartImageLink to={`/items/${item.slug}`}>
              <Img style={{}} sizes={item.coverImage.sizes} />
            </CartImageLink>
            <p>{item.title}</p>
            <Size>{item.size}</Size>
            <Price>{item.price} KSh</Price>
            <RemoveButton onClick={() => removeItemFromCart(item.id)} />
          </CartItemContainer>
        ))}
      </CSSTransitionGroup>
      <TotalContainer>
        <span>TOTAL:</span>
        <Total>
          {itemsInCart.reduce((sum, { node: item }) => sum + item.price, 0)}
          KSh
        </Total>
      </TotalContainer>
    </CartPageContainer>
  );
};

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = dispatch => ({
  removeItemFromCart: id => dispatch({ type: "REMOVE_ITEM_FROM_CART", id })
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

export const query = graphql`
  query SomethingQuery {
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

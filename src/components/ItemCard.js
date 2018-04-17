import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Img from "gatsby-image";
import { connect } from "react-redux";
import CartButton from "./CartButton";

const ItemCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  justify-content: center;
  align-content: center;
`;

const ItemCardStyled = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
  overflow: hidden;
  transition: opacity 300ms ease-in-out;
  &:hover {
    opacity: 0.9;
  }
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Size = styled.span`
  display: inline-block;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 8px;
  margin-right: 8%;
  margin-bottom: 8px;
`;

const Price = styled.span`
  display: inline-block;
  color: grey;
  font-style: italic;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ItemCard = ({ cart, item, addItemToCart }) => (
  <ItemCardWrapper>
    <ItemCardStyled>
      <ItemLink to={`/items/${item.slug}`}>
        <Img sizes={item.coverImage.sizes} />
      </ItemLink>
      <DetailsContainer>
        <Size>{item.size}</Size>
        <Price>{item.price} KSh</Price>
      </DetailsContainer>
      <CartButton
        disabled={cart.indexOf(item.id) !== -1}
        onClick={() => addItemToCart(item.id)}
      >
        ADD TO CART
      </CartButton>
    </ItemCardStyled>
  </ItemCardWrapper>
);

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = dispatch => ({
  addItemToCart: id => dispatch({ type: "ADD_ITEM_TO_CART", id })
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);

import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Img from "gatsby-image";
import { connect } from "react-redux";
import CartButton from "./CartButton";

const ItemCardWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const ItemCardStyled = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
  overflow: hidden;
`;

const Title = styled.figcaption`
  text-align: center;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Size = styled.p`
  text-transform: uppercase;
  font-weight: bold;
`;

const Price = styled.p`
  color: grey;
  font-style: italic;
`;

const ItemCard = ({ cart, item, addItemToCart }) => (
  <ItemCardWrapper>
    <ItemCardStyled>
      <ItemLink to={`/items/${item.slug}`}>
        <Img sizes={item.coverImage.sizes} />
      </ItemLink>
      <Title>
        <h3>
          <ItemLink to={`/items/${item.slug}`}>{item.title}</ItemLink>
        </h3>
      </Title>
      <Size>{item.size}</Size>
      <Price>{item.price} KSh</Price>
      <CartButton
        disabled={cart.includes(item.id)}
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

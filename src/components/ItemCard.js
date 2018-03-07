import React from "react";
import styled, { css } from "styled-components";
import Link from "gatsby-link";
import Img from "gatsby-image";
import { connect } from "react-redux";

const ItemCardWrapper = styled.div`
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
  max-height: 450px;
  overflow: hidden;
`;

const Title = styled.figcaption`
  text-align: center;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Description = styled.p`
  font-size: 0.8em;
  text-justify: auto;
`;

const Size = styled.p`
  text-transform: uppercase;
  font-style: bold;
`;
const Price = styled.p`
  color: grey;
  font-style: italic;
`;

const AddToCartButton = styled.div`
  cursor: pointer;
  width: 127px;
  height: 31px;
  line-height: 1.8;
  background-color: white;
  border: 1px solid black;
  text-align: center;
  &:hover {
    background-color: #ffdbdb;
    border: 1px solid #ffdbdb;
  }
  transition: all 400ms ease-in-out;
  ${props =>
    props.disabled &&
    css`
      background-color: #ffdbdb;
      border: 1px solid #ffdbdb;
    `};
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
      <Description>{item.description}</Description>
      <Size>{item.size}</Size>
      <Price>{item.price} KSh</Price>
      <AddToCartButton
        disabled={cart.includes(item.id)}
        onClick={() => addItemToCart(item.id)}
      >
        ADD TO CART
      </AddToCartButton>
    </ItemCardStyled>
  </ItemCardWrapper>
);

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = dispatch => ({
  addItemToCart: id => dispatch({ type: "ADD_ITEM_TO_CART", id })
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);

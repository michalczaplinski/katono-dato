import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Img from "gatsby-image";

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

const Price = styled.h6``;

const ItemCard = ({ item }) => (
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
    </ItemCardStyled>
  </ItemCardWrapper>
);

export default ItemCard;

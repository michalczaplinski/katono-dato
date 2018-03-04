import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Img from "gatsby-image";

const ItemCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* border-top: 1px grey solid;
  border-left: 1px grey solid; */
  display: flex;
  justify-content: center;
  align-content: center;
`;

const ItemCardStyled = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 400px;
`;

const Title = styled.figcaption`
  text-align: center;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

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
    </ItemCardStyled>
  </ItemCardWrapper>
);

export default ItemCard;

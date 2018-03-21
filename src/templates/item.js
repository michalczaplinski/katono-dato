import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { connect } from "react-redux";
import Img from "gatsby-image";
import styled from "styled-components";
import AddToCartButton from "../components/CartButton";

const Size = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 15px;
`;

const Price = styled.span`
  color: grey;
  font-style: italic;
  margin-right: 15px;
`;

const Image = styled.div`
  max-width: 500px;
  height: 100%;
  width: 100%;
  position: relative;
  margin: 0 auto;
`;

const Item = ({
  cart,
  addItemToCart,
  data: { datoCmsClothingItem: item },
  transition
}) => (
  <div style={transition && transition.style}>
    <article>
      <HelmetDatoCms seo={item.seoMetaTags} />
      <div>
        <Image>
          <Img sizes={item.coverImage.sizes} />
        </Image>
        <Size>{item.size}</Size>
        <Price>{item.price} KSh</Price>
        <div
          dangerouslySetInnerHTML={{
            __html: item.descriptionNode.childMarkdownRemark.html
          }}
        />
        <AddToCartButton
          disabled={cart.includes(item.id)}
          onClick={() => addItemToCart(item.id)}
        >
          ADD TO CART
        </AddToCartButton>
      </div>
    </article>
  </div>
);

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = dispatch => ({
  addItemToCart: id => dispatch({ type: "ADD_ITEM_TO_CART", id })
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);

export const query = graphql`
  query ClothingItemQuery($slug: String!) {
    datoCmsClothingItem(slug: { eq: $slug }) {
      id
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      price
      size
      gallery {
        resize(height: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        sizes(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;

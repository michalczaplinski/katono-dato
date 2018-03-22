import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { connect } from "react-redux";
import Img from "gatsby-image";
import styled, { css } from "styled-components";

import AddToCartButton from "../components/CartButton";

const ItemContainer = styled.article`
  max-width: 500px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
`;

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

const StyledImages = styled.div`
  max-width: 700px;
  height: auto;
  width: auto;
  margin-bottom: 15px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  transition: opacity 200ms ease-in-out;
  opacity: 0;
  ${props => props.active && `opacity: 1`};
`;

const Gallery = styled.div`
  max-width: 100px;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  margin-left: 10px;
`;

const GalleryImage = styled.div`
  max-width: 100px;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  transition: opacity 300ms ease-in-out;

  ${props =>
    props.active
      ? css`
          border: 3px solid black;
        `
      : css`
          &:hover {
            opacity: 0.87;
          }
        `};
`;

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImage: props.mainImage,
      images: [props.mainImage].concat(props.images),
      activeImage: 0,
      inProp: true
    };
  }

  selectNewImage(index) {
    this.setState({
      inProp: false,
      activeImage: index
    });
    setTimeout(() => {
      this.setState(state => ({
        inProp: true,
        mainImage: state.images[index]
      }));
    }, 200);
  }

  render() {
    const { mainImage, images, activeImage, inProp } = this.state;
    return (
      <StyledImages>
        <ImageWrapper active={inProp}>
          <Img sizes={mainImage.sizes} />
        </ImageWrapper>
        <Gallery>
          {images.map(({ sizes }, index) => (
            <GalleryImage
              onClick={() => this.selectNewImage(index)}
              key={sizes.src}
              active={index === activeImage}
            >
              <Img sizes={sizes} />
            </GalleryImage>
          ))}
        </Gallery>
      </StyledImages>
    );
  }
}

const Item = ({
  cart,
  addItemToCart,
  data: { datoCmsClothingItem: item },
  transition
}) => (
  <div style={transition && transition.style}>
    <ItemContainer>
      <HelmetDatoCms seo={item.seoMetaTags} />
      <div>
        <Images mainImage={item.coverImage} images={item.gallery} />
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
    </ItemContainer>
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
        sizes(maxHeight: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
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

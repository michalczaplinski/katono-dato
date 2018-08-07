import React from "react";
import PropTypes from "prop-types";
import styled, { injectGlobal } from "styled-components";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const Carousel = autoPlay(SwipeableViews);

import Img from "gatsby-image";
import chunk from "lodash.chunk";

import { Grid, Box } from "../components/Grid";
import ItemCard from "../components/ItemCard";

injectGlobal`
  .outer-gatsby-image {
    width: 100%;
  }
`;

const CarouselWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 960px;
  height: 300px;
`;

const CarouselItemsContainer = styled.div`
  display: flex;
  height: 300px;
  width: 100%;
`;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.carouselItemsToShow = 1;
  }

  componentDidMount() {
    const mediaQueryList = window.matchMedia("(min-width: 500px)");
    this.handleResize(mediaQueryList);
    mediaQueryList.addListener(this.handleResize);
  }

  handleResize({ matches }) {
    if (matches) {
      this.carouselItemsToShow = 2;
    } else {
      this.carouselItemsToShow = 1;
    }
  }

  render() {
    const { data } = this.props;

    const featuredItems = chunk(
      data.allDatoCmsFeatureditem.edges,
      this.carouselItemsToShow
    );

    return (
      <div>
        <CarouselWrapper>
          <Carousel>
            {featuredItems.map((featured, index) => (
              <CarouselItemsContainer key={index}>
                {featured.map(({ node }) => (
                  <Img
                    imgStyle={{ height: "auto", width: "auto" }}
                    key={node.id}
                    outerWrapperClassName="outer-gatsby-image"
                    sizes={node.image.sizes}
                  />
                ))}
              </CarouselItemsContainer>
            ))}
          </Carousel>
        </CarouselWrapper>
        <Grid>
          {data.allDatoCmsClothingItem.edges.map(({ node: item }) => (
            <Box key={item.id}>
              <ItemCard item={item} />
            </Box>
          ))}
        </Grid>
      </div>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsClothingItem(
      sort: { fields: [position], order: ASC }
      filter: { available: { eq: true } }
    ) {
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
            sizes(maxWidth: 250, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
    allDatoCmsFeatureditem {
      edges {
        node {
          id
          name
          image {
            sizes(
              maxHeight: 350
              imgixParams: { fm: "jpg", auto: "compress" }
            ) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;

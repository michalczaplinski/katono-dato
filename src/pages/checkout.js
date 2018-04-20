import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link, { navigateTo } from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";

import pageTransition from "../styles/pageTransition";
import colors from "../styles/colors";
import CheckoutForm from "../components/CheckoutForm";
import CartButton from "../components/CartButton";
import Fade from "../components/Fade";

const CheckoutPageContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
`;

const CheckoutItemsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
`;

const CheckoutItems = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
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

const TotalContainer = styled.div``;

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

const HowDoesItWork = styled.div`
  margin-left: 13px;
  text-indent: -13px;
  line-height: 1.5;
`;

const Bold = styled.span`
  font-weight: bolder;
`;

const EmptyCart = styled.p`
  font-weight: bold;
`;

const CheckoutFormContainer = CheckoutItemsContainer;

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHowItWorks: false
    };
  }

  render() {
    const {
      cart,
      removeItemFromCart,
      data: { allDatoCmsClothingItem: { edges: allItems } }
    } = this.props;

    const { showHowItWorks } = this.state;

    const itemsInCart = allItems.filter(
      item => cart.indexOf(item.node.id) !== -1
    );
    const hasItemsInCart = itemsInCart.length > 0;
    const total = itemsInCart.reduce(
      (sum, { node: item }) => sum + item.price,
      0
    );

    return (
      <CheckoutPageContainer>
        {!hasItemsInCart && (
          <div>
            <EmptyCart>OH WELL, YOU HAVE NO STUFF TO CHECK OUT... 😳</EmptyCart>
            <CartButton onClick={() => navigateTo("/")}>
              GO PICK SOME STUFF 👉
            </CartButton>
          </div>
        )}
        <YourItems>YOUR STUFF:</YourItems>
        <CheckoutItemsContainer>
          <CheckoutItems>
            {itemsInCart.map(({ node: item }) => (
              <CheckoutItemContainer key={item.id}>
                <CheckoutImageLink to={`/items/${item.slug}`}>
                  <Img style={{}} sizes={item.coverImage.sizes} />
                </CheckoutImageLink>
              </CheckoutItemContainer>
            ))}
          </CheckoutItems>
        </CheckoutItemsContainer>
        <TotalContainer>
          <Total>TOTAL:</Total>
          <TotalAmount>{total} KSh</TotalAmount>
        </TotalContainer>
        <CheckoutFormContainer>
          <Fade
            in={!showHowItWorks}
            enterDelay={250}
            enterDuration={300}
            exit={false}
          >
            <CartButton
              backgroundColor={colors.blue}
              onClick={() => this.setState({ showHowItWorks: true })}
            >
              TELL ME HOW IT WORKS !
            </CartButton>
          </Fade>
          <Fade in={showHowItWorks} enterDuration={600} exitDuration={250}>
            <div>
              <HowDoesItWork>
                <p>
                  • Fill out your details and press <Bold>"BUY IT"</Bold> to
                  confirm your order.
                </p>
                <p>
                  • We{"'"}ll be in touch right away to confirm your purchase 🙋
                </p>
                <p>
                  • You can pay either by <Bold> cash </Bold> or
                  <Bold> M-PESA</Bold>.
                </p>
                <p>
                  • You can pick up from <Bold>Diamond Plaza</Bold> in Nairobi
                  or from an arranged location in <Bold>CBD</Bold>.
                </p>
                <p>• We deliver anywhere within Nairobi!</p>
                <p>• Delivery is extra 250 Ksh ☝️</p>
                <p>
                  • Please pay within 48h or we'll be have to cancel your order
                  :) 🙏
                </p>
              </HowDoesItWork>

              <CartButton
                backgroundColor={colors.turquoise}
                onClick={() => this.setState({ showHowItWorks: false })}
              >
                OK COOL.
              </CartButton>
            </div>
          </Fade>
          <CheckoutForm items={itemsInCart} total={total} />
        </CheckoutFormContainer>
      </CheckoutPageContainer>
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = dispatch => ({
  removeItemFromCart: id => dispatch({ type: "REMOVE_ITEM_FROM_CART", id })
});

export default connect(mapStateToProps, mapDispatchToProps)(
  pageTransition(CartPage)
);

export const query = graphql`
  query CheckoutQuery {
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
            sizes(maxWidth: 500, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;

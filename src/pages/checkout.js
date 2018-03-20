import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";

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

    const itemsInCart = allItems.filter(item => cart.includes(item.node.id));
    const total = itemsInCart.reduce(
      (sum, { node: item }) => sum + item.price,
      0
    );

    return (
      <CheckoutPageContainer>
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
          <div>
            <Fade>
              {!showHowItWorks ? (
                <CartButton
                  backgroundColor={colors.green}
                  onClick={() => this.setState({ showHowItWorks: true })}
                >
                  TELL ME HOW IT WORKS !
                </CartButton>
              ) : (
                <CartButton style={{ display: "none" }} />
              )}
            </Fade>
            <Fade>
              {showHowItWorks && (
                <HowDoesItWork>
                  <p>
                    • Fill out your details and press <Bold>"BUY IT"</Bold> to
                    confirm your order.
                  </p>
                  <p>
                    • We{"'"}ll be in touch right away to confirm your purchase
                    🙋
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
                    • Please pay within 48h or we{"'"}ll be have to cancel your
                    order :) 🙏
                  </p>
                </HowDoesItWork>
              )}
            </Fade>
            <Fade>
              {showHowItWorks && (
                <CartButton
                  backgroundColor={colors.turquoise}
                  onClick={() => this.setState({ showHowItWorks: false })}
                >
                  OK COOL.
                </CartButton>
              )}
            </Fade>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

export const query = graphql`
  query CheckoutQuery {
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

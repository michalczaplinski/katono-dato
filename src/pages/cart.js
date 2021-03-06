import React from "react";
import { connect } from "react-redux";
import Link, { navigateTo } from "gatsby-link";
import Img from "gatsby-image";
import styled from "styled-components";
import { TransitionGroup } from "react-transition-group";

import colors from "../styles/colors";
import trashIcon from "../static/trash.svg";
import CartButton from "../components/CartButton";
import Fade from "../components/Fade";

const CartPageContainer = styled.div`
  padding-top: 20px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
`;

const CartItemContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-bottom: 10px;
  overflow: hidden;
`;

const CartImageLink = styled(Link)`
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-right: 2%;
`;

const Size = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 2%;
`;

const Price = styled.p`
  color: grey;
  font-style: italic;
  margin-right: 2%;
`;

const RemoveButton = styled.div`
  height: 50px;
  width: 50px;
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  background-image: url(${trashIcon});
  cursor: pointer;
`;

const TotalContainer = styled.div`
  display: block;
  margin-bottom: 20px;
`;

const CheckoutButton = CartButton;

const Totals = styled.div`
  margin-bottom: 15px;
`;

const Total = styled.span``;

const TotalAmount = styled.span`
  color: grey;
  font-style: italic;
`;

const EmptyCart = styled.p`
  font-weight: bold;
`;

const CartPage = ({
  cart,
  removeItemFromCart,
  data: { allDatoCmsClothingItem: { edges: allItems } }
}) => {
  const itemsInCart = allItems.filter(
    item => cart.indexOf(item.node.id) !== -1
  );
  const hasItemsInCart = itemsInCart.length > 0;

  return (
    <CartPageContainer>
      <TransitionGroup>
        {itemsInCart.map(({ node: item }) => (
          <Fade key={item.id}>
            <div>
              <CartItemContainer>
                <CartImageLink to={`/items/${item.slug}`}>
                  <Img style={{}} sizes={item.coverImage.sizes} />
                </CartImageLink>
                <p>{item.title}</p>
                <Size>{item.size}</Size>
                <Price>{item.price} KSh</Price>
                <RemoveButton onClick={() => removeItemFromCart(item.id)} />
              </CartItemContainer>
            </div>
          </Fade>
        ))}
      </TransitionGroup>
      {!hasItemsInCart && (
        <div>
          <EmptyCart> OH WELL, YOUR CART IS EMPTY... 😳 </EmptyCart>
          <CartButton onClick={() => navigateTo("/")}>
            GO PICK SOME STUFF 👉
          </CartButton>
        </div>
      )}
      {hasItemsInCart && (
        <TotalContainer>
          <Totals>
            <Total style={{ marginRight: "10px", fontWeight: "bold" }}>
              TOTAL:
            </Total>
            <TotalAmount>
              {itemsInCart.reduce((sum, { node: item }) => sum + item.price, 0)}
              KSh
            </TotalAmount>
          </Totals>
          <CheckoutButton
            backgroundColor={colors.yellow}
            onClick={() => navigateTo("/checkout")}
          >
            CHECKOUT
          </CheckoutButton>
        </TotalContainer>
      )}
    </CartPageContainer>
  );
};

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = dispatch => ({
  removeItemFromCart: id => dispatch({ type: "REMOVE_ITEM_FROM_CART", id })
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

export const query = graphql`
  query CartQuery {
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

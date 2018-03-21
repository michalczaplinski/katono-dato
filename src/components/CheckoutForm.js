/* global FormData, window */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import axios from "axios";
import { navigateTo } from "gatsby-link";
import Spinner from "react-svg-spinner";

import config from "../config";
import CartButton from "./CartButton";
import Fade from "./Fade";

function FormDataToJSON(formData) {
  const data = {};
  for (const key of formData.keys()) {
    data[key] = formData.get(key);
  }
  return data;
}

const Form = styled.form`
  width: 100%;
  font-size: smaller;
  display: inline-block;
  vertical-align: top;
`;

const inputStyle = css`
  overflow: hidden;
  display: block;
  width: 100%;
  margin-top: 5px;
  padding: 10px;
  border: 2px solid #333333;
  font-size: 16px;
  outline: none;

  ::placeholder {
    color: #a7a7a7;
  }

  &::focus {
    border: 3px solid black;
    margin-top: 3px;
  }
`;

const Input = styled.input`
  ${inputStyle};
`;

const Textarea = styled.textarea`
  ${inputStyle};
  padding: 5px;
  resize: none;
`;

const cb = CartButton.withComponent("button");
const CheckoutButton = cb.extend`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Loading = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = Loading;

const Sad = styled.span`
  display: block;
  text-align: center;
`;

const ErrorMessage = styled.div`
  width: 80%;
  height: auto;
  line-height: 2;
  border: 6px solid red;
  color: black;
  font-size: 16px;
  font-weight: bolder;
  padding: 7px;
`;

class CheckoutForm extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: false,
      displayFormErrors: false,
      showAddressField: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showAddressField = this.showAddressField.bind(this);
  }

  showAddressField() {
    if (this.deliveryCheckbox.checked) {
      this.setState({ showAddressField: true });
    } else {
      this.setState({ showAddressField: false });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      this.setState({
        displayFormErrors: true
      });
      return;
    }

    const data = FormDataToJSON(new FormData(event.target));

    this.setState({
      displayFormErrors: false,
      loading: true
    });

    window.clientDetails = {
      ...data,
      total: this.props.total
    };

    axios({
      method: "POST",
      url: `${config.API_URL}/send_mail`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.API_KEY
      },
      data: {
        from: "katono.clothing@gmail.com",
        to: data.email,
        subject: "Your order from Katono.clothing!",
        template: "welcome",
        context: {
          first_name: data.firstName,
          last_name: data.lastName,
          total: this.props.total,
          items: this.props.items.map(({ node: item }) => ({
            ...item,
            imageURL: item.coverImage.sizes.src
          }))
        }
      }
    })
      .then(() =>
        axios({
          method: "POST",
          url: `${config.API_URL}/send_mail`,
          headers: {
            "Content-Type": "application/json",
            "x-api-key": config.API_KEY
          },
          data: {
            from: "katono.clothing@gmail.com",
            to: "katono.clothing@gmail.com",
            subject: `Order from ${data.firstName} ${data.lastName}`,
            template: "order",
            context: {
              first_name: data.firstName,
              last_name: data.lastName,
              email: data.email,
              tel: data.tel,
              deliveryType: data.deliveryType,
              address: data.address || null,
              total: this.props.total,
              items: this.props.items.map(({ node: item }) => ({
                ...item,
                imageURL: item.coverImage.sizes.src
              }))
            }
          }
        })
      )
      .then(() =>
        axios({
          method: "POST",
          url: `${config.API_URL}/update`,
          headers: {
            "Content-Type": "application/json",
            "x-api-key": config.API_KEY
          },
          data: {
            items: this.props.items.map(({ node: item }) => ({
              ...item,
              id: item.id.match(/(\d+)/)[0],
              imageURL: item.coverImage.sizes.src
            }))
          }
        })
      )
      .then(() => {
        this.props.clearCart();
      })
      .then(() => navigateTo("/success"))
      .catch(e => {
        this.setState({
          error: true,
          loading: false
        });
        console.log(e);
      });
  }

  render() {
    const { showAddressField, displayFormErrors, loading, error } = this.state;

    if (error) {
      return (
        <Error>
          <ErrorMessage>
            <Sad>😢</Sad>
            THERE WAS AN ERROR WHILE PROCESSING YOUR ORDER!
            <p>
              Please let us know at{" "}
              <a href="mailto:katono.clothing@gmail.com">
                katono.clothing@gmail.com
              </a>
            </p>
          </ErrorMessage>
        </Error>
      );
    }

    if (loading) {
      return (
        <Loading>
          <Spinner size="100px" color="red" />
        </Loading>
      );
    }

    return (
      <Form
        onSubmit={this.handleSubmit}
        noValidate
        className={displayFormErrors ? "displayFormErrors" : ""}
      >
        <label htmlFor="firstName" />
        <Input
          placeholder="first name"
          autoComplete="given-name"
          id="firstName"
          name="firstName"
          type="text"
          required
        />

        <label htmlFor="lastName" />
        <Input
          placeholder="last name"
          autoComplete="family-name"
          id="lastName"
          name="lastName"
          type="text"
          required
        />

        <label htmlFor="email" />
        <Input
          autoComplete="email"
          placeholder="email"
          id="email"
          name="email"
          type="email"
          required
        />

        <label htmlFor="tel" />
        <Input
          autoComplete="tel"
          placeholder="phone nr."
          id="tel"
          name="tel"
          type="tel"
          required
        />

        <fieldset onChange={this.showAddressField}>
          <legend>delivery type</legend>

          <label htmlFor="pickUp"> pick up</label>
          <input
            type="radio"
            id="radio"
            name="deliveryType"
            value="pickUp"
            required
          />

          <label htmlFor="delivery"> delivery</label>
          <input
            ref={el => {
              this.deliveryCheckbox = el;
            }}
            type="radio"
            id="radio"
            name="deliveryType"
            value="delivery"
            required
          />
        </fieldset>
        <Fade in={showAddressField}>
          <div>
            <label htmlFor="address" />
            <Textarea
              rows="5"
              autoComplete="street-address"
              placeholder="address"
              id="address"
              name="address"
              type="address"
              required
            />
          </div>
        </Fade>

        <CheckoutButton> BUY IT 👍 </CheckoutButton>
      </Form>
    );
  }
}

CheckoutForm.propTypes = {
  clearCart: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.string,
      size: PropTypes.string,
      imageURL: PropTypes.string
    })
  ).isRequired
};

const mapDispatchToProps = dispatch => ({
  clearCart: id => dispatch({ type: "CLEAR_CART", id })
});

export default connect(null, mapDispatchToProps)(CheckoutForm);

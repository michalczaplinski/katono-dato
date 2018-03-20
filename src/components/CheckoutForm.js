/* global FormData */

import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { CSSTransitionGroup } from "react-transition-group";
import axios from "axios";

import CartButton from "./CartButton";
import { navigateTo } from "gatsby-link";

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
  margin-bottom: 20px;
  vertical-align: top;
`;

const input = css`
  overflow: hidden;
  display: block;
  width: 100%;
  max-width: 400px;
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
  ${input};
`;

const Textarea = styled.textarea`
  ${input};
  padding: 5px;
  resize: none;
`;

const CheckoutButton = CartButton.withComponent("button").extend`
  margin-top: 15px;
  margin-bottom: 15px;
`;

class CheckoutForm extends Component {
  constructor() {
    super();
    this.state = {};
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
        displayErrors: true
      });
      return;
    }

    const data = FormDataToJSON(new FormData(event.target));

    this.setState({
      displayErrors: false
    });

    window.clienDetails = {
      ...data
    };

    axios({
      method: "POST",
      url:
        "https://3xzvziw9x7.execute-api.us-east-1.amazonaws.com/dev/send_mail",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "Nh1DsfyXrK8HwtrPNgSll4Sl6HcWd5bF3ZZ8nvRv"
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
      .then(response => console.log(response.data))
      .then(() => navigateTo("/success"))
      .catch(e => console.log(e));
  }

  render() {
    const { showAddressField, displayErrors } = this.state;
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          noValidate
          className={displayErrors ? "displayErrors" : ""}
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

            <label htmlFor="pickUp"> pick up </label>
            <input
              type="radio"
              id="radio"
              name="deliveryType"
              value="pickUp"
              required
            />

            <label htmlFor="delivery"> delivery </label>
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

          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={400}
            transitionLeaveTimeout={400}
          >
            {showAddressField && (
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
            )}
          </CSSTransitionGroup>

          <CheckoutButton> BUY IT! </CheckoutButton>
        </Form>
      </div>
    );
  }
}

CheckoutForm.propTypes = {
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

export default CheckoutForm;

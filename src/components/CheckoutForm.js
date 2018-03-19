/* global FormData */

import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

function stringifyFormData(formData) {
  const data = {};
  for (const key of formData.keys()) {
    data[key] = formData.get(key);
  }
  return JSON.stringify(data, null, 2);
}

const Form = styled.form`
  font-size: smaller;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  vertical-align: top;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 15px;
  margin-top: 5px;
  padding: 10px;
  border: 2px solid #333333;
  font-size: 16px;
  outline: none;

  &:focus {
    border: 3px solid black;
    margin-left: -1px;
  }
`;

class CheckoutForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      this.setState({
        invalid: true,
        displayErrors: true
      });
      return;
    }
    const form = event.target;
    const data = new FormData(form);

    this.setState({
      res: stringifyFormData(data),
      invalid: false,
      displayErrors: false
    });

    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // });
  }

  render() {
    const { res, invalid, displayErrors } = this.state;
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          noValidate
          className={displayErrors ? "displayErrors" : ""}
        >
          <label htmlFor="firstName">
            <Input
              placeholder="First Name"
              autoComplete="given-name"
              id="firstName"
              name="firstName"
              type="text"
              required
            />
          </label>

          <label htmlFor="lastName">
            <Input
              placeholder="Last Name"
              autoComplete="family-name"
              id="lastName"
              name="lastName"
              type="text"
              required
            />
          </label>

          <label htmlFor="email">
            <Input
              autoComplete="email"
              placeholder="email"
              id="email"
              name="email"
              type="email"
              required
            />
          </label>

          <button>Send data!</button>
        </Form>

        <div className="res-block">
          {/* {invalid && <div>Form is not valid</div>} */}
          {!invalid &&
            res && (
              <div>
                <h3>Transformed data to be sent:</h3>
                <pre>FormData {res}</pre>
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps, null)(CheckoutForm);

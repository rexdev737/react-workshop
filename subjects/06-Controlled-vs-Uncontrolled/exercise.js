////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - Save the state of the form and restore it when the page first loads, in
//   case the user accidentally closes the tab before the form is submitted
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serializeForm from "form-serialize";

// For the checkbox use checked/defaultChecked
// instead of value/defaultValue

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    const formState = window.localStorage.formState;
    if (formState) {
      this.state = JSON.parse(formState);
    } else {
      this.state = {
        billingName: "",
        billingState: "",
        shippingSameAsBilling: true,
        shippingName: "",
        shippingState: ""
      };
    }

    this.handleSubmit = event => {
      event.preventDefault();
      const values = serializeForm(event.target, { hash: true });
      console.log(values);
    };
  }

  componentDidMount() {
    window.addEventListener("beforeunload", () => {
      window.localStorage.formState = JSON.stringify(this.state);
    });
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name:{" "}
                <input
                  type="text"
                  name="billingName"
                  defaultValue={this.state.billingName}
                  onChange={event =>
                    this.setState({ billingName: event.target.value })
                  }
                />
              </label>
            </p>
            {this.state.billingState.length > 2 && (
              <p className="error">
                Please use the 2-character abbreviation for the state.
              </p>
            )}
            <p>
              <label>
                Billing State:{" "}
                <input
                  type="text"
                  size="2"
                  name="billingState"
                  defaultValue={this.state.billingState}
                  onChange={event =>
                    this.setState({ billingState: event.target.value })
                  }
                />
              </label>
            </p>
          </fieldset>

          <br />

          <fieldset>
            <label>
              <input
                type="checkbox"
                defaultChecked={this.state.shippingSameAsBilling}
                onChange={event =>
                  this.setState({
                    shippingSameAsBilling: event.target.checked
                  })
                }
              />{" "}
              Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name:{" "}
                <input
                  type="text"
                  name="shippingName"
                  value={
                    this.state.shippingSameAsBilling
                      ? this.state.billingName
                      : this.state.shippingName
                  }
                  onChange={event =>
                    this.setState({ shippingName: event.target.value })
                  }
                />
              </label>
            </p>
            <p>
              <label>
                Shipping State:{" "}
                <input
                  type="text"
                  size="2"
                  name="shippingState"
                  value={
                    this.state.shippingSameAsBilling
                      ? this.state.billingState
                      : this.state.shippingState
                  }
                  onChange={event =>
                    this.setState({ shippingState: event.target.value })
                  }
                />
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));

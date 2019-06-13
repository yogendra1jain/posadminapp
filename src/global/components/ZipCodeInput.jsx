import React from "react";
import {
  withDataProvider,
  TextInput,
  REDUX_FORM_NAME,
  required
} from "react-admin";
import { change } from "redux-form";

class CustomZipCodeInput extends React.Component {
  clearAddressFields = (dispatch, addressName) => {
    dispatch(change(REDUX_FORM_NAME, `${addressName}.city`, null));
    dispatch(change(REDUX_FORM_NAME, `${addressName}.country`, null));
    dispatch(change(REDUX_FORM_NAME, `${addressName}.state`, null));
  };

  handleOnblur = (event, addressName) => {
    let zipCode = event.target.value;
    const { dataProvider, dispatch, record } = this.props;
    if (!zipCode) {
      this.clearAddressFields(dispatch, addressName);
    } else {
      dataProvider("GET_ONE", "Reference/GetZipCodeData", {
        countryShortCode: "US",
        zipCode: zipCode
      })
        .then(data => {
          dispatch(
            change(REDUX_FORM_NAME, `${addressName}.city`, data.data.city)
          );
          dispatch(
            change(REDUX_FORM_NAME, `${addressName}.country`, data.data.country)
          );
          dispatch(
            change(REDUX_FORM_NAME, `${addressName}.state`, data.data.state)
          );
        })
        .catch(err => {
          this.clearAddressFields(dispatch, addressName);
        });
    }
  };
  render() {
    let addressName;
    if (this.props.source == "address.postalCode") {
      addressName = "address";
    } else if (this.props.source == "billingAddress.postalCode") {
      addressName = "billingAddress";
    }
    return (
      <TextInput
        label="Zipcode"
        source={this.props.source}
        onBlur={e => this.handleOnblur(e, addressName)}
        validate={required()}
      />
    );
  }
}

export default withDataProvider(CustomZipCodeInput);

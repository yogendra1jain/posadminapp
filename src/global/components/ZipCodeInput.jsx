import React from 'react';
import {
    withDataProvider,
    TextInput,
    REDUX_FORM_NAME
 } from 'react-admin';
 import {change} from 'redux-form'

 class CustomZipCodeInput extends React.Component{
     
    clearAddressFields = (dispatch) => {
        dispatch(change(REDUX_FORM_NAME, "billingAddress.city", null))
        dispatch(change(REDUX_FORM_NAME, "billingAddress.country", null))
        dispatch(change(REDUX_FORM_NAME, "billingAddress.state",  null))
    }

    handleOnblur = (event)=>{
        let zipCode = event.target.value
        const { dataProvider, dispatch, record } = this.props;
        if(!zipCode) {
            this.clearAddressFields(dispatch)
        } else {
            dataProvider('GET_ONE', 'Reference/GetZipCodeData', {countryShortCode: "US", zipCode: zipCode})
            .then((data)=>{
                dispatch(change(REDUX_FORM_NAME, "billingAddress.city", data.data.city))
                dispatch(change(REDUX_FORM_NAME, "billingAddress.country", data.data.country))
                dispatch(change(REDUX_FORM_NAME, "billingAddress.state",  data.data.state))
            })
            .catch(err => {
                this.clearAddressFields(dispatch)
            })
        }
    }
    render()
    {
        return(
            <TextInput label="Zipcode" source='billingAddress.postalCode' onBlur={this.handleOnblur}/>
         )
    }
 }

export default withDataProvider(CustomZipCodeInput)

import React from 'react';
import {
    showNotification,
    UPDATE,  withDataProvider,
    TextInput,
    REDUX_FORM_NAME
 } from 'react-admin';
 import {change} from 'redux-form'

 class CustomZipCodeInput extends React.Component{
    handleOnblur = (event)=>{
        const { dataProvider, dispatch, record } = this.props;
        dataProvider('GET_ONE', '/Reference/GetZipCodeData', {countryShortCode: "US",zipCode:event.target.value}).then((data)=>{
            dispatch(change(REDUX_FORM_NAME, "billingAddress.city", data.data.city))
            dispatch(change(REDUX_FORM_NAME, "billingAddress.country", data.data.country))
            dispatch(change(REDUX_FORM_NAME, "billingAddress.state",  data.data.state))
            console.log(data,"data is here")
        })
    }
    render()
    {
        return(
            <TextInput source='billingAddress.postalCode' onBlur={this.handleOnblur}/>
         )
    }
 }
//  CustomZipCodeInput.propTypes = {
//        dataProvider: PropTypes.func.isRequired,
//        dispatch: PropTypes.func.isRequired,
//         record: PropTypes.object,
//     };

export default withDataProvider(CustomZipCodeInput)

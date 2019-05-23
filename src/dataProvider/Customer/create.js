const API_URL = 'http://13.126.59.19:20029/api';

export const convertCustomerCreateDataProviderRequestToHTTP = (type, resource, params) => {
    let reqBody = params.data
    reqBody.phoneNumber.countryCode = 1
    reqBody.retailerId = localStorage.getItem('retailerId')
    return {
        url: `${API_URL}/Customer/Create`,
        options: {
            method: 'POST',
            body: JSON.stringify(reqBody)
        },
    };
}
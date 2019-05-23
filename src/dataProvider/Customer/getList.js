const API_URL = 'http://13.126.59.19:20029/api';

export const convertCustomerListDataProviderRequestToHTTP = (type, resource, params) => {
    const reqBody = {
        id: localStorage.getItem('retailerId')
    }
    return {
        url: `${API_URL}/Customer/All`,
        options: {
            method: 'POST',
            body: JSON.stringify(reqBody)
        },
    };
}

export const convertCustomerListHTTPResponseToDataProvider = (response,type, resource, params) => {
    const {json} = response;
    return {
        data: json,
        total: json.length,
    };
}
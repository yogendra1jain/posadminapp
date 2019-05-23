const API_URL = 'http://13.126.59.19:20029/api';

export const convertCustomerEditDataProviderRequestToHTTP = (type, resource, params) => {
    return {
        url: `${API_URL}/Customer/Update`,
        options: {
            method: 'POST',
            body: JSON.stringify(params.data)
        },
    };
}
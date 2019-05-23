const API_URL = 'http://13.126.59.19:20029/api';

const convertProductListDataProviderRequestToHTTP = (type, resource, params) => {
    const {
        page,
        perPage
    } = params.pagination;
    const {
        field,
        order
    } = params.sort;
    const reqBody = {
        filters: [{
            field: 'retailerId',
            value: localStorage.getItem('retailerId')
        }],
        limit: perPage,
        offset: (page - 1) * perPage,
        text: ''
    }
    return {
        url: `${API_URL}/Search/${resource}`,
        options: {
            method: 'POST',
            body: JSON.stringify(reqBody)
        },
    };
}

const convertProductListHTTPResponseToDataProvider = (response,type, resource, params) => {
    const {
        headers,
        json
    } = response;
    return {
        data: json.products.map(x => x),
        total: json.total,
    };
}


export {
    convertProductListDataProviderRequestToHTTP,
    convertProductListHTTPResponseToDataProvider
}
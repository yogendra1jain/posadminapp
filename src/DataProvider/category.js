const API_URL = 'http://13.126.59.19:20029/api';

const convertCategoryListDataProviderRequestToHTTP = (type, resource, params) => {
    // debugger;
    // const {
    //     page,
    //     perPage
    // } = params.pagination;
    // const {
    //     field,
    //     order
    // } = params.sort;
    const reqBody = {
       id:params.id
    }
    return {
        url: `${API_URL}/Category/${resource}`,
        options: {
            method: 'POST',
            body: JSON.stringify(reqBody)
        },
    };
}

const convertCategoryListHTTPResponseToDataProvider = (response,type, resource, params) => {
    // debugger;
    const {
        headers,
        json
    } = response;
    return {
        data: json.map(x => x),
        total: json.length,
    };

}


export {
    convertCategoryListDataProviderRequestToHTTP,
    convertCategoryListHTTPResponseToDataProvider
}
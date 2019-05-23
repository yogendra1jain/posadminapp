import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,

} from 'react-admin';
import {
    stringify
} from 'query-string';
import {
    convertProductListHTTPResponseToDataProvider,
    convertProductListDataProviderRequestToHTTP
} from './product';
import {
    convertCategoryListDataProviderRequestToHTTP,
    convertCategoryListHTTPResponseToDataProvider
} from './category';
const options = {
    headers: new Headers({
        Accept: 'application/json',
    }),
};

const API_URL = 'http://13.126.59.19:20029/api';

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {

    switch (type) {
        case GET_LIST: {
            if (resource == 'Products') {
                return convertProductListDataProviderRequestToHTTP(type, resource, params)
            } else if (resource == "Level1ByRetailerId") {
                debugger;
                return convertCategoryListDataProviderRequestToHTTP(type, resource, params)

            } else if (resource == "GetChildren") {
                debugger;
                return convertCategoryListDataProviderRequestToHTTP(type, resource, params)

            }
        }
        case GET_ONE:
            const reqBody = {
                id: params.id
            }
            return {
                url: `${API_URL}/Product/Get`,
                    options: {
                        method: 'POST',
                        body: JSON.stringify(reqBody)
                    },
            };

        case GET_MANY: {
            debugger;
            let reqObj = {
                id: params.ids[0]
            }
            return {
                url: `${API_URL}/Category/Get`,
                options: {
                    method: 'POST',
                    body: JSON.stringify(reqObj)
                },
            };
        }
        case GET_MANY_REFERENCE: {
            const {
                page,
                perPage
            } = params.pagination;
            const {
                field,
                order
            } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
                filter: JSON.stringify({
                    ...params.filter,
                    [params.target]: params.id
                }),
            };
            return {
                url: `${API_URL}/${resource}?${stringify(query)}`
            };
        }
        case UPDATE:
            return {
                url: `${API_URL}/${resource}/${params.id}`,
                    options: {
                        method: 'PUT',
                        body: JSON.stringify(params.data)
                    },
            };
        case CREATE:
            return {
                url: `${API_URL}/${resource}`,
                    options: {
                        method: 'POST',
                        body: JSON.stringify(params.data)
                    },
            };
        case DELETE:
            return {
                url: `${API_URL}/${resource}/${params.id}`,
                    options: {
                        method: 'DELETE'
                    },
            };
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {

    const {
        headers,
        json
    } = response;
    switch (type) {
        case GET_LIST:
            if (resource == 'Products') {
                return convertProductListHTTPResponseToDataProvider(response, type, resource, params)
            } else if (resource = "Level1ByRetailerId") {
                debugger;
                let a = convertCategoryListHTTPResponseToDataProvider(response, type, resource, params);
                return a;
            } else if (resource == "GetChildren") {
                debugger;
                let a = convertCategoryListHTTPResponseToDataProvider(response, type, resource, params);
                return a;
            }
            case CREATE:
                return {
                    data: {
                        ...params.data,
                        id: json.id
                    }
                };
            case GET_MANY: {
                let arr = [];
                arr.push(json);
                debugger;
                return {
                    data: arr
                }
            }

            default:
                return {
                    data: json
                };
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
const dataProvider = (type, resource, params) => {
    const {
        fetchJson
    } = fetchUtils;
    const {
        url,
        options
    } = convertDataProviderRequestToHTTP(type, resource, params);
    options.headers = new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    })
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};

export default dataProvider;
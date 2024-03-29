import {
    fetchUtils
} from 'react-admin';

import UrlGuesser from './UrlGuesser';
import ReqBodyGuesser from './ReqBodyGuesser';
import ResBodyGuesser from './RespBodyGuesser';

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
    let url = UrlGuesser({ type, resource });
    return ReqBodyGuesser({ params, url, type, resource })
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */

const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    let url = UrlGuesser({ type, resource });
    return ResBodyGuesser({ response, params, url, type })
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
const dataProvider = async (type, resource, params) => {    
    if (`${resource}/${type}` == "packagePending/GET_ONE") {
        return {
            data: {
                "id": "1AFG1223322",
                "uId": "1AFG1223322",
                "manifest": "",
                "facility": "facility one",
                "metricProduct": "plants",
                "productCategory": "Liquit(each)",
                "quantity": "15 g",
                "vendor": "xyz",
                "lastModified": "22-05-2019",
                "metricApproved": true
            }

        }
    }
    const { fetchJson } = fetchUtils;
    const { url, options } = convertDataProviderRequestToHTTP(
        type,
        resource,
        params
    );
    options.headers = new Headers({
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    });
    return fetchJson(url, options).then(response =>
        convertHTTPResponseToDataProvider(response, type, resource, params)
    ).catch(err=>{
        debugger;
    })
    ;
};

export default dataProvider;

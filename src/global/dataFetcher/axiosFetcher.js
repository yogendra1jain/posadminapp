import axios from 'axios';
import uuidv1 from 'uuid/v1';
import {APPLICATION_BFF_URL} from '../UrlConstants'
import _get from 'lodash/get';

const generateV1uuid = () => uuidv1();
export {
    generateV1uuid,
}

const axiosFetcher = ({method,
  url,
  reqObj,
  successCb,
  successText,
  dispatch,
  extraArgs,
  errorCb})=>
{
let requestObject = {};
  requestObject.method = method;
  requestObject.url = `${APPLICATION_BFF_URL}${url}`;

  if (reqObj)
    requestObject.data = {...reqObj};

  requestObject.headers = {
    originURL: window.origin,
    correlationid: generateV1uuid(),
    Authorization:`Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json',
  }
  console.log(requestObject,"requestObject")

  return axios(
    requestObject
  )
    .then(responseData => {
        successCb(_get(responseData,'data'),dispatch,extraArgs)
    })
.catch((err)=>
{
errorCb(err)
})

}
export default axiosFetcher
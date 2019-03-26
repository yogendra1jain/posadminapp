import { getData } from '../../actions/genericAction';
import { APPLICATION_BFF_URL } from '../../helpers/urlConstants'
import _get from 'lodash/get';

function genericPostData({ dispatch, reqObj, url, constants, identifier, successText, successCb, successTimeOutCb, errorCb, errorTimeOutCb, dontShowMessage }) {
    dispatch(
        getData(`${APPLICATION_BFF_URL}${url}`, reqObj, identifier, constants)
    ).then((data) => {
        if (successCb)
            successCb();
        // this.basicDataFetcher();

        setTimeout(() => {
            if (successTimeOutCb)
                successTimeOutCb()
        }, 1000);

    })
        .catch((err) => {
            if (errorCb)
                errorCb()
            setTimeout(() => {
                if (errorTimeOutCb)
                    errorTimeOutCb()
            }, 6000);
        })
}

export default genericPostData;
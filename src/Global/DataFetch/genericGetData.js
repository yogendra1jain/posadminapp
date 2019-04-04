import { APPLICATION_BFF_URL } from '../../helpers/urlConstants';
import { getData } from '../../actions/getAction';
import _get from 'lodash/get';
import showMessage from '../../actions/toastAction';

const genericGetData = ({ dispatch, url, identifier,
    successText, successCb, successTimeOutCb,
    errorCb, errorTimeOutCb, dontShowMessage }) => {

    return dispatch(
        getData(`${APPLICATION_BFF_URL}/${url}`,
            identifier,
            {
                init: `${identifier}_init`,
                success: `${identifier}_success`,
                error: `${identifier}_error`
            })
    ).then((data) => {
        if (!dontShowMessage) {
            dispatch(showMessage({ text: successText || 'Updated SuccessFully', isSuccess: true }));
        }
        if (successCb)
            successCb(data);

        setTimeout(() => {
            dispatch(showMessage({}));
            if (successTimeOutCb)
                successTimeOutCb()
        }, 1000);

    }).catch((err) => {
        if (typeof err == 'string')
            dispatch(showMessage({ text: err, isSuccess: false }));

        console.log(err);
        if (err.code == 500) {
            if (err.detail)
                dispatch(showMessage({ text: err.detail, isSuccess: false }));
        }

        if (errorCb)
            errorCb(err)
        setTimeout(() => {
            dispatch(showMessage({}));
            if (errorTimeOutCb)
                errorTimeOutCb()
        }, 6000);
    })

}

export default genericGetData;
import * as COMMON_CONSTANTS from '../../src/constants/common';

export const showMessage = (message) => dispatch => {
    dispatch({
        type: COMMON_CONSTANTS.SHOW_TOAST_MESSAGE,
        data: message
    })
}
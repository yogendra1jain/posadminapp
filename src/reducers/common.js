import * as COMMON_CONSTANTS from '../../src/constants/common';
const commonData = (state = {
  message: {},
}, action) => {
  switch (action.type) {
    case COMMON_CONSTANTS.SHOW_TOAST_MESSAGE:
      return Object.assign({}, state, {
        type: action.type,
        message: action.data
      });
    default:
      return state;
  }
  // return state;
}

export default commonData;
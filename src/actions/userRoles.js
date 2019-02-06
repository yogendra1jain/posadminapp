import * as USER_ROLE_CONSTANTS from '../constants/userRoles';
import dynamicActionWrapper from '../helpers/actionHelper';

// Action start for post login

let status = '';

const requestUserRole = (subreddit)=> ({
    type: USER_ROLE_CONSTANTS.REQUEST_USER_ROLE,
    subreddit
});

const receiveUserRoleError = (subreddit,err,errCode) => ({
    type: USER_ROLE_CONSTANTS.RECEIVED_USER_ROLE_ERROR,
    subreddit,
    error: err,
    status: errCode
})

const receiveUserRole = (subreddit, json, status )=> ({
    type: USER_ROLE_CONSTANTS.RECEIVED_USER_ROLE,
    subreddit,
    data: json,
    status: status,
    receivedAt: Date.now()
})

export const fetchUserRole = (subreddit, data) => dispatch => {
    
    dispatch(requestUserRole(subreddit));
    
    fetch(USER_ROLE_CONSTANTS.USER_ROLE_URL, { method: 'POST',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(data)
    })
    .then(response => {
        status = response.status;
         
        return response.json() } 
    )
    .then(json => { return dispatch(receiveUserRole(subreddit, json, status )) } )
    .catch(err => { return dispatch(receiveUserRoleError(subreddit,err,500)) } )
}

// export const fetchUserRole = (subreddit, data) => dispatch =>
//     dispatch(dynamicActionWrapper({
//         path: USER_ROLE_CONSTANTS.USER_ROLE_URL,
//         method: 'POST',
//         body: data,
//         initCb: requestUserRole,
//         successCb: receiveUserRole,
//         failureCb: receiveUserRoleError,
//         subreddit,
//         wrapperActionType: 'FETCH_USER_ROLE_WRAPPER',
//         redirect: 'follow'
//     }));

const clearUserRole = (subreddit) => ({
    type: USER_ROLE_CONSTANTS.CLEAR_USER_ROLE,
    subreddit
})

export const onLogout = (subreddit, data) => dispatch => {
    localStorage.clear();
    dispatch(clearUserRole(subreddit));
    // persistor.purge();
    //     persistor.flush();
    //     localStorage.clear();
    //        // Create and dispatch the action which will cause redux-persist to purge
    //        dispatch({ 
    //         type: PURGE,
    //         key: "myStorageKey",    // Whatever you chose for the "key" value when initialising redux-persist in the **persistCombineReducers** method - e.g. "root"
    //        result: () => null              // Func expected on the submitted action. 
    //     });  
    
    
}
// Action end for post login
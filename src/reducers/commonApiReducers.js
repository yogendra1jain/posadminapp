function apiReducer(identifier) {
    const commonAPIReducer = (state = {
        type: '',
        error: '',
        isFetching: false,
        lookUpData: []
    }, action) => {
        switch (action.type) {
            case `${identifier}_init`:
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    lastUpdated: action.receivedAt,
                });
            case `${identifier}_success`:
                return Object.assign({}, state, {
                    error: '',
                    isFetching: false,
                    type: action.type,
                    lookUpData: action.data,
                    lastUpdated: action.receivedAt,
                });
            case `${identifier}_error`:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    error: action.error,
                    lookUpData: [],
                    lastUpdated: action.receivedAt
                });

        }
        return state;
    }
    return commonAPIReducer
}

export default apiReducer;
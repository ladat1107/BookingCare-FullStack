import actionTypes from '../actions/actionTypes';

const initialState = {
    gender: [],
    role: [],
    position: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.gender = action.data;
            return {
                ...copyState,
            }
        case actionTypes.GET_GENDER_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;
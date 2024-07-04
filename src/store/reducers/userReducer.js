import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    isLoadDoctor: false,
    userInfo: null,
    topDoctor: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.GET_TOP_DOCTOR_START:
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.data;
            state.isLoadDoctor = true;
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTOR_FAILED:
            state.isLoadDoctor = false
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default userReducer;
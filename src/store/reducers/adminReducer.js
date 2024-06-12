import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    gender: [],
    role: [],
    position: [],
    isCreateUser: ""
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GENDER_START:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.GET_GENDER_SUCCESS:

            state.gender = action.data;
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.GET_GENDER_FAILED:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.GET_ROLE_START:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.GET_ROLE_SUCCESS:
            state.role = action.data;
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.GET_ROLE_FAILED:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.GET_POSITION_START:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.GET_POSITION_SUCCESS:

            state.position = action.data;
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.GET_POSITION_FAILED:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_START:
            state.isCreateUser = "";
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_SUCCESS:
            state.isCreateUser = action.data;
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_FAILED:
            state.isCreateUser = action.data;
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;
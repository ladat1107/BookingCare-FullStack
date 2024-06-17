import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    isDeleteUser: false,
    gender: [],
    role: [],
    position: [],
    isCreateUser: false,
    isUpdateUser: false,
    allUser: [],
    errorMessage: "",
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
            state.isCreateUser = false;
            state.errorMessage = ""
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_SUCCESS:
            state.isCreateUser = true;
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_FAILED:
            state.isCreateUser = false;
            state.errorMessage = action.data
            return {
                ...state,
            }
        case actionTypes.GET_ALL_USER_START:
            return {
                ...state,
            }
        case actionTypes.GET_ALL_USER_SUCCESS:
            state.allUser = action.data;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_USER_FAILED:
            return {
                ...state,
            }
        case actionTypes.DELETE_USER_START:
            state.isDeleteUser = false;
            return {
                ...state,
            }
        case actionTypes.DELETE_USER_SUCCESS:
            state.isDeleteUser = true;
            return {
                ...state,
            }
        case actionTypes.DELETE_USER_FAILED:
            state.isDeleteUser = false;
            return {
                ...state,
            }
        case actionTypes.UPDATE_USER_START:
            state.isUpdateUser = false;
            state.errorMessage = ""
            return {
                ...state,
            }
        case actionTypes.UPDATE_USER_SUCCESS:
            state.isUpdateUser = true;
            return {
                ...state,
            }
        case actionTypes.UPDATE_USER_FAILED:
            state.isUpdateUser = false;
            state.errorMessage = action.data
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;
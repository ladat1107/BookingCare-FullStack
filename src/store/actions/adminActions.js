import actionTypes from './actionTypes';
import { getAllCodeByType, createUserService } from "../../services/userService";

//GENDER
export const getGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_GENDER_START, })
            let role = await getAllCodeByType("Gender");
            if (role && role.errCode === 0) {
                dispatch(getGenderSuccess(role.allCode));
            } else {
                dispatch(getGenderFailed());
            }
        } catch (e) {
            dispatch(getGenderFailed());
            console.log(e);
        }
    }
}
export const getGenderSuccess = (data) => ({
    type: actionTypes.GET_GENDER_SUCCESS,
    data: data,
})
export const getGenderFailed = () => ({
    type: actionTypes.GET_GENDER_FAILED
})

export const getPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_POSITION_START, })
            let role = await getAllCodeByType("POSITION");
            if (role && role.errCode === 0) {
                dispatch(getPositionSuccess(role.allCode));
            } else {
                dispatch(getPositionFailed());
            }
        } catch (e) {
            dispatch(getPositionFailed());
            console.log(e);
        }
    }
}

export const getPositionSuccess = (data) => ({
    type: actionTypes.GET_POSITION_SUCCESS,
    data: data,
})
export const getPositionFailed = () => ({
    type: actionTypes.GET_POSITION_FAILED
})

export const createUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_USER_START, })
            let respone = await createUserService(data);
            if (respone && respone.errCode === 0) {
                dispatch(createUserSuccess(respone.message));
            } else {
                dispatch(createUserFailed(respone.message));
            }
        } catch (e) {
            dispatch(createUserFailed("Failed"));
            console.log(e);
        }
    }
}

export const createUserSuccess = (message) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: message,
})
export const createUserFailed = (message) => ({
    type: actionTypes.CREATE_USER_FAILED,
    data: message,
})


export const getRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ROLE_START, })
            let role = await getAllCodeByType("ROLE");
            if (role && role.errCode === 0) {
                dispatch(getRoleSuccess(role.allCode));
            } else {
                dispatch(getRoleFailed());
            }
        } catch (e) {
            dispatch(getRoleFailed());
            console.log(e);
        }
    }
}

export const getRoleSuccess = (data) => ({
    type: actionTypes.GET_ROLE_SUCCESS,
    data: data,
})
export const getRoleFailed = () => ({
    type: actionTypes.GET_ROLE_FAILED
})

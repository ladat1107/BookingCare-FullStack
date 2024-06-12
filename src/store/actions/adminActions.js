import actionTypes from './actionTypes';
import { getAllCodeByType } from "../../services/userService";

export const getGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_GENDER_SUCCESS, })
            let role = await getAllCodeByType("ROLE");
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

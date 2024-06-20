import actionTypes from './actionTypes';
import { getTopDoctor } from '../../services/userService';

export const getTopDoctorStart = (limit) => {
    return async (dispatch, getState) => {
        try {
            //dispatch({ type: actionTypes.GET_TOP_DOCTOR_START, })
            let respone = await getTopDoctor(limit);
            if (respone && respone.errCode === 0) {
                dispatch(getTopDoctorSuccess(respone.data));
            } else {
                dispatch(getTopDoctorFailed());
            }
        } catch (e) {
            dispatch(getTopDoctorFailed());
            console.log(e);
        }
    }
}

export const getTopDoctorSuccess = (data) => ({
    type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
    data: data,
})
export const getTopDoctorFailed = () => ({
    type: actionTypes.GET_TOP_DOCTOR_FAILED
})

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const adminLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})
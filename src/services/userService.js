import axios from '../axios';

const handleLogin = (email, password) => {
    return axios.post(`/api/login`, { email, password });
}

const getAllUser = (id) => {
    return axios.get(`/api/get-user-login?id=${id}`);
}
const createUserService = (data) => {
    return axios.post("/api/create-new-user", data);
}
const deleteUserService = (userId) => {
    return axios.get(`/api/delete-user?id=${userId}`);
}
const updateUserService = (user) => {
    return axios.put("/api/update-user", user);
}
const getAllCodeByType = (type) => {
    return axios.get(`/api/get-all-code?type=${type}`);
}
const getTopDoctor = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`);
}
const getDoctorMarkdown = (doctorid) => {
    return axios.get(`/api/get-doctor-mardown?doctorId=${doctorid}`);
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor?doctorId=${doctorId}&date=${date}`);
}
export {
    handleLogin,
    getAllUser,
    createUserService,
    deleteUserService,
    updateUserService,
    getAllCodeByType,
    getTopDoctor,
    getDoctorMarkdown,
    getScheduleDoctorByDate,

};
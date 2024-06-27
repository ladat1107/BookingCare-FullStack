import axios from '../axios';

const getTopDoctor = () => {
    return axios.get(`/api/get-all-doctor`);
}
const createDoctorPageInfor = (data) => {
    return axios.post(`/api/create-page-doctor`, data);
}

const getDoctorMarkdown = (doctorid) => {
    return axios.get(`/api/get-doctor-mardown?doctorId=${doctorid}`);
}

const createScheduleDoctor = (data) => {
    return axios.post(`/api/create-schedule-doctor`, data);
}
const createSpecialtyPage = (data) => {
    return axios.post(`/api/create-page-specialty`, data);
}
const handleGetSpecialtyManage = () => {
    return axios.get(`/api/get-specialty-admin-manager`);
}
const handleGetSpecialtyById = (specialtyId) => {
    return axios.get(`/api/get-one-specialty-admin-manager?specialtyId=${specialtyId}`);
}
const updateSpecialtyPage = (data) => {
    return axios.put(`/api/update-page-specialty`, data);
}
const deleteSpecialtyPage = (data) => {
    return axios.post(`/api/delete-page-specialty`, data);
}
export {
    getTopDoctor,
    createDoctorPageInfor,
    getDoctorMarkdown,
    createScheduleDoctor,
    createSpecialtyPage,
    handleGetSpecialtyManage,
    handleGetSpecialtyById,
    updateSpecialtyPage,
    deleteSpecialtyPage,
}
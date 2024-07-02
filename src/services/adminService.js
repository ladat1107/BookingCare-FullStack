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

const createClinicPage = (data) => {
    return axios.post(`/api/create-page-clinic`, data);
}
const handleGetClinicManage = () => {
    return axios.get(`/api/get-clinic-admin-manager`);
}
const handleGetClinicById = (clinicId) => {
    return axios.get(`/api/get-one-clinic-admin-manager?clinicId=${clinicId}`);
}
const updateClinicPage = (data) => {
    return axios.put(`/api/update-page-clinic`, data);
}
const deleteClinicPage = (data) => {
    return axios.post(`/api/delete-page-clinic`, data);
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
    createClinicPage,
    handleGetClinicManage,
    handleGetClinicById,
    updateClinicPage,
    deleteClinicPage,
}
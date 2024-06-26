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
export {
    getTopDoctor,
    createDoctorPageInfor,
    getDoctorMarkdown,
    createScheduleDoctor,
}
import axios from "../axios";

const handleloginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post(`/api/create-new-user`, data);
};
const deleteUserService = (userId) => {
  return axios.delete(`/api/delete-user`, {
    data: {
      id: userId,
    },
  });
};
const editUserService = (inputData) => {
  return axios.put(`/api/edit-user`, inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHome = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

const createInforDoctor = (data) => {
  return axios.post(`/api/create-infor-doctors`, data);
};
const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDoctorById = (idInput) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${idInput}`);
};
const getProfileDoctorById = (idInput) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${idInput}`);
};
const postPatientBookAppoinment = (data) => {
  return axios.post(`/api/patient-book-appoinment`, data);
};
const postVerifyBookAppoinment = (data) => {
  return axios.post(`/api/veryfi-book-appoinment`, data);
};
const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
const getTopSpecialtyHome = (limit) => {
  return axios.get(`/api/top-specialty-home?limit=${limit}`);
};
const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const createNewClinic = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};
const getTopClinicHome = (limit) => {
  return axios.get(`/api/top-clinic-home?limit=${limit}`);
};
const getDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
const getListPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

export {
  handleloginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHome,
  getAllDoctors,
  createInforDoctor,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppoinment,
  postVerifyBookAppoinment,
  createNewSpecialty,
  getTopSpecialtyHome,
  getAllDetailSpecialtyById,
  createNewClinic,
  getTopClinicHome,
  getDetailClinicById,
  getListPatientForDoctor,
};

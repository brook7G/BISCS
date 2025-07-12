import axios from "axios";
const API_URL = "http://localhost:5000/api/";

const createClearanceType = async (academicNames) => {
  const response = await axios.post(API_URL + "clearanceType", academicNames);
  return response.data;
};
const getClearanceDetails = async () => {
  const response = await axios.get(API_URL + "clearanceType/details");
  return response.data;
};
const getClearanceTypes = async () => {
  const response = await axios.get(API_URL + "clearanceType");
  return response.data;
};
const updateClearance = async (data) => {
  const response = await axios.put(API_URL + "clearanceType", data);
  return response.data;
};
const defineClearance = async (data) => {
  const response = await axios.put(
    API_URL + "clearanceType/defineClearance",
    data
  );
  return response.data;
};
const initiateStudentClearance = async (data) => {
  const response = await axios.put(
    API_URL + "StudentsClearance/initiate",
    data
  );
  return response.data;
};
const createStudentsClearance = async (data) => {
  const response = await axios.post(API_URL + "StudentsClearance/");
  return response.data;
};
const approveStudentClearance = async (data) => {
  const response = await axios.put(API_URL + "StudentsClearance/approve", data);
  return response.data;
};
const getSpecificStudentClearances = async (data) => {
  const response = await axios.get(API_URL + "StudentsClearance/specific", {
    params: { clearanceField: data },
  });
  return response.data;
};
const getStudentClearance = async (data) => {
  const response = await axios.get(API_URL + "StudentsClearance/", {
    params: { studentId: data },
  });
  return response.data;
};
const getStudentInfo = async (data) => {
  const response = await axios.get(API_URL + "Student/studentInfo", {
    params: { studentId: data },
  });
  return response.data;
};
const getNotifications = async (data) => {
  const response = await axios.get(API_URL + "Student/notification", {
    params: { studentId: data },
  });
  return response.data;
};
const academicService = {
  createClearanceType,
  getClearanceTypes,
  updateClearance,
  defineClearance,
  initiateStudentClearance,
  getStudentClearance,
  createStudentsClearance,
  getStudentInfo,
  approveStudentClearance,
  getSpecificStudentClearances,
  getNotifications,
  getClearanceDetails,
};

export default academicService;

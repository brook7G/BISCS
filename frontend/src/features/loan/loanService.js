import axios from "axios";
const API_URL = "http://localhost:5000/api/loan/";

const createLoan = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
const getAllLoans = async (data) => {
  const response = await axios.get(API_URL + "all", data);
  return response.data;
};
const getStudentLoans = async (data) => {
  const response = await axios.get(API_URL, { params: data });
  return response.data;
};
const getStudentBelongings = async (data) => {
  const response = await axios.get(API_URL + "belongings", { params: data });
  return response.data;
};
const getStudentFileCase = async (data) => {
  const response = await axios.get(API_URL + "Case", { params: data });
  return response.data;
};
const deleteStudentLoans = async (data) => {
  const response = await axios.delete(API_URL, { params: data });
  return response.data;
};
const approveStudentLoan = async (data) => {
  const response = await axios.put(API_URL, data);
  return response.data;
};

const loanService = {
  createLoan,
  getAllLoans,
  getStudentLoans,
  deleteStudentLoans,
  approveStudentLoan,
  getStudentBelongings,
  getStudentFileCase,
};

export default loanService;

import axios from "axios";
const API_URL = "http://localhost:5000/api/user/";

const registerUser = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
const login = async (data) => {
  const response = await axios.post(API_URL + "login", data);
  return response.data;
};
const getUsers = async () => {
  const response = await axios.get(API_URL + "all");
  return response.data;
};
const getUser = async (data) => {
  const response = await axios.get(API_URL, { params: data });
  return response.data;
};
const saveLocation = async (data) => {
  const response = await axios.post(API_URL + "location", data);
  return response.data;
};
const getLocation = async (data) => {
  const response = await axios.get(API_URL + "location", { params: data });
  return response.data;
};
const userService = {
  registerUser,
  login,
  getUsers,
  getUser,
  saveLocation,
  getLocation,
};

export default userService;

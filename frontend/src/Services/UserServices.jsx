import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:6001/api/auth",
});

export const getUserList = () => {
  return API.get("/userList");
};

export const deleteUser = (id) => {
  return API.delete(`/deleteuser/${id}`);
};
export const singleUser = (id) => {
  return API.get(`/singleuser/${id}`);
};

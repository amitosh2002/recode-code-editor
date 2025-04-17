import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:6001/api/auth",
  baseURL: `${import.meta.env.VITE_REACT_APP_API_KEY}/api/auth`,

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies/tokens are sent if needed
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

export const loginUser = (loginCredentials) => {
  return API.post("/login", loginCredentials);
};
export const signUpUser = (SignUpCredentials) => {
  return API.post("/register", SignUpCredentials);
};

export const submitTest = (submitTestData) => {
  return API.put("/saveRecords", submitTestData);
};

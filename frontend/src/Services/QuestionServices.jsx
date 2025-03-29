import axios from "axios";
const API = axios.create({
  baseURL: "https://app-m1-recode-server.onrender.com/api",
});

export const getQuestionList = () => {
  return API.get("/allQuestion");
};
export const deleteQuestion = (id) => {
  return API.delete(`/deleteId/${id}`);
};
export const getSingleQuestion = (id) => {
  return API.get(`/singleQuestion/${id}`);
};
export const updateQuestion = (id, body) => {
  return API.put(`/update/${id}`, body);
};

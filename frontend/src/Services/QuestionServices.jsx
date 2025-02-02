import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:6001/api",
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

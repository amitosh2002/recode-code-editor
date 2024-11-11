import axios from "axios";

const API = axios.create({
  baseURL:
    "https://quizapi.io/api/v1/questions?apiKey=29rTLCgnhwCwjbtSk9K8ZUQh9ozPNz0lfg9stA76",
});

export const getQuestion = () => {
  return API.get();
};

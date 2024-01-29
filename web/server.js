import axios from "axios";

export const server = axios.create({
  baseURL: "https://ai-found-01.onrender.com",
})
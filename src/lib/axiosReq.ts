import axios from "axios";

const axiosReq = axios.create({
  baseURL: process.env.DOMAIN,
});

export default axiosReq;

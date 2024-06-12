import axios from "axios";

export const axiosClient = axios.create({
    // baseURL: 'http://localhost:8081',
   // baseURL:'http://14.225.218.217:8081',
   baseURL:'https://khoi.easybadwork.com'
  });
import axios from "axios";

console.log("process.env",process.env)
export const axiosClient = axios.create({
    // baseURL: 'http://localhost:8081',
   // baseURL:'http://14.225.218.217:8081',

 baseURL:"https://api.easybadwork.com"
  });
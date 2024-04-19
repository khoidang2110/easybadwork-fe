import axios, { AxiosResponse } from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8081',
});

axiosClient.interceptors.request.use(
  async (config) => {
    // Handle token here ...
    return config;
  },
  (error) => {
    console.log('error1', error);
    // Handle errors
    throw error;
  },
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return Promise.reject(new Error('Lỗi khi kết nối tới server! '));
  },
  (error) => {
    // if (error.response.status === 500) {
    //   Message.error('Lỗi server');
    // }
    // if (error.response.status >= 400 && error.response.status < 500) {
    //   message.error(error.response.data.message);
    // }
    return Promise.reject(error);
  },
);

export default axiosClient;

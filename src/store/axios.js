import axios from 'axios';

// export interface ResponseGenerator {
//   config?: any;
//   data?: any;
//   headers?: any;
//   request?: any;
//   status?: number;
//   statusText?: string;
// }

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
});

instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

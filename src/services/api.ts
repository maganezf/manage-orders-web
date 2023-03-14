import type { ApiResponse } from '@types';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    toast.success(response.data.message);
    return response;
  },
  async (error: AxiosError<{ statusCode: number; message: string }>) => {
    if (error.response?.status === 401) localStorage.removeItem('token');
    toast.error(error.response?.data.message);
    return Promise.reject(error);
  }
);

import axios from 'axios';

export const api = axios.create({
  headers: {
    Accept: 'application/json',
  },
  baseURL: 'http://localhost:3333/api',
});

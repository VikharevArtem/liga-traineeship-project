import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://tasks-service-maks1394.amvera.io';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

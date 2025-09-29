import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('access_token');
  if (!token) {
    token = await refreshToken();
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh-token`, { refresh_token: refreshToken });
    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);
    return access_token;
  }
  return null;
};

export const fetchUsers = () => api.get('/users/');
export const fetchUserById = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post('/users/', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

export const fetchCalls = () => api.get('/calls/');
export const fetchCallById = (id) => api.get(`/calls/${id}`);
export const createCall = (data) => api.post('/calls/', data);
export const updateCall = (id, data) => api.put(`/calls/${id}`, data);
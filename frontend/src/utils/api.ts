import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// request interceptor to attach token to each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Login
export const loginUser = async (username: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', {
    username,
    password,
  });

  const data = response.data;
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};

// Register
export const registerUser = async (name: string, email: string, username: string, password: string) => {
  const response = await axiosInstance.post('/auth/register', {
    name, email, username, password
  });

  const data = response.data;
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};

// Fetch subjects
export const fetchSubjects = async () => {
  const response = await axiosInstance.get('/subjects');
  return response.data;
};

// Fetch topics for a subject
export const fetchTopics = async (subjectId: string | string[]) => {
  const response = await axiosInstance.get(`/subjects/${subjectId}`);
  return response.data;
};

// Fetch topic details
export const fetchTopicDetails = async (topicId: string | string[]) => {
  const response = await axiosInstance.get(`/topics/${topicId}`);
  return response.data;
};

// Track progress
export const trackProgress = async (userId: any, topicId: any, completed: boolean) => {
  const response = await axiosInstance.post(`/progress/${userId}/${topicId}`, {
    completed,
  });
  return response.data;
};

// get progress
export const getProgress = async (userId: any, topicId: any) => {
  const response = await axiosInstance.get(`/progress/${userId}/${topicId}`);
  return response.data;
};


// Fetch rankings for a subject
export const fetchRankings = async (subjectId: any) => {
  const response = await axiosInstance.get(`/ranking/${subjectId}`);
  return response.data;
};

// logout
export const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};
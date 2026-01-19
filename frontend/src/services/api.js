import axios from 'axios';

// Use relative URL for same-domain deployment, fallback to localhost for dev
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout')
};

// Users API (Admin only)
export const usersAPI = {
  getAll: () => api.get('/users'),
  getByRole: (role) => api.get(`/users/role/${role}`),
  create: (userData) => api.post('/users', userData),
  delete: (id) => api.delete(`/users/${id}`),
  getStats: () => api.get('/users/stats')
};

// Chat API (Student only)
export const chatAPI = {
  sendMessage: (message) => api.post('/chat/message', { message }),
  getHistory: () => api.get('/chat/history'),
  clearHistory: () => api.delete('/chat/history')
};

// Materials API
export const materialsAPI = {
  // Get all materials with optional filters
  getAll: (params = {}) => api.get('/materials', { params }),
  // Get material by ID
  getById: (id) => api.get(`/materials/${id}`),
  // Upload text material (Teacher/Admin)
  upload: (data) => api.post('/materials', data),
  // Upload PDF material (Teacher/Admin)
  uploadPDF: (data) => api.post('/materials/pdf', data),
  // Update material (Teacher/Admin)
  update: (id, data) => api.put(`/materials/${id}`, data),
  // Delete material (Teacher/Admin)
  delete: (id) => api.delete(`/materials/${id}`),
  // Get my uploaded materials (Teacher/Admin)
  getMyMaterials: (params = {}) => api.get('/materials/user/my', { params }),
  // Get all subjects
  getSubjects: () => api.get('/materials/subjects'),
  // Get topics for a subject
  getTopics: (subject) => api.get(`/materials/topics/${encodeURIComponent(subject)}`),
  // Get processing status
  getStatus: (id) => api.get(`/materials/${id}/status`)
};

// Doubts API (Student)
export const doubtsAPI = {
  // Submit a doubt and get AI answer
  submit: (data) => api.post('/doubts', data),
  // Get doubt by ID
  getById: (id) => api.get(`/doubts/${id}`),
  // Get my doubts history
  getMyDoubts: (params = {}) => api.get('/doubts/my', { params }),
  // Search materials before asking
  searchMaterials: (data) => api.post('/doubts/search-materials', data),
  // Get available subjects
  getSubjects: () => api.get('/doubts/subjects'),
  // Get topics for a subject
  getTopics: (subject) => api.get(`/doubts/topics/${encodeURIComponent(subject)}`),
  // Get stats
  getStats: () => api.get('/doubts/stats')
};

export default api;

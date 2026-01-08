import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Registration API
export const registerForEvent = async (data: any) => {
    const response = await api.post('/registrations', data);
    return response.data;
};

export const getRegistrations = async () => {
    const response = await api.get('/registrations');
    return response.data;
};

export const getRegistrationCount = async () => {
    const response = await api.get('/registrations/count');
    return response.data;
};

export const getTransactions = async () => {
    const response = await api.get('/transactions');
    return response.data;
};

// Auth API
export const login = async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        // Store strictly the user object which we now return from backend
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } else {
            // Fallback if backend not updated immediately or behaves differently
            localStorage.setItem('user', JSON.stringify(response.data));
        }
    }
    return response.data;
};

export const register = async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getMyRegistrations = async () => {
    const response = await api.get('/registrations/my-registrations');
    return response.data;
};

export const getMyTransactions = async () => {
    const response = await api.get('/transactions/my-transactions');
    return response.data;
};

export const getEvents = async () => {
    // ... existing code ...
    const response = await api.get('/events');
    return response.data;
};

export default api;

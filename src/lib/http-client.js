import axios from 'axios';

const url = import.meta.env.VITE_API_URL || 'http://localhost:8081/v1';
const token = localStorage.getItem('token');

const globalResponseHandler = response => response;

const globalErrorHandler = (error) => {
	// console.log('HTTP Client Error', error);
	const status = error?.response?.status ?? 200;
	const isTokenExpired = status === 401;
	if (isTokenExpired) {
        localStorage.removeItem('token');
		const originalRequest = error.config;
		delete originalRequest.headers.Authorization;
		window.location.href = '/login';
	}
	return Promise.reject(error);
};

const headers = {
	Authorization: `Bearer ${token}`,
};

const client = axios.create({
	baseURL: url,
	headers,
});

// Add a response interceptor
client.interceptors.response.use(globalResponseHandler, globalErrorHandler);

export default client;

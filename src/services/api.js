import axios from 'axios';

/**
 * QUIET BATTLES™ – Centralized Axios HTTP Client
 * Configured with dynamic baseURL and JWT request/response interceptors.
 *
 * SECURITY NOTICE:
 * For this MVP assessment, the JWT is stored in localStorage.
 * In a high-security production environment, consider httpOnly secure cookies
 * or an in-memory token pattern with silent refresh to mitigate XSS exposure.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/v1';

export const TOKEN_STORAGE_KEY = 'qb_auth_token';
export const USER_STORAGE_KEY = 'qb_auth_user';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Attach JWT Bearer Token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global 401/403 Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    const url = error.config && error.config.url ? error.config.url : '';

    // Only redirect if an authenticated admin endpoint received 401/403
    // Do NOT redirect public consumer storefront users
    const isPublicEndpoint = url.includes('/public/') || url.includes('/health');

    if ((status === 401 || status === 403) && !isPublicEndpoint) {
      console.warn('Admin authentication invalid or expired. Clearing token.');
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);

      // Only redirect if currently inside an admin route
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login?expired=true';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

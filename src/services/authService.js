import api, { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from './api';

export const authService = {
  /**
   * Authenticate admin credentials and store JWT token
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} LoginResponse { token, email, username, role, ... }
   */
  async login(email, password) {
    const response = await api.post('/auth/login', {
      email: email.trim(),
      password: password.trim(),
    });

    const data = response.data;
    if (data && data.token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
    }
    return data;
  },

  /**
   * Retrieve current authenticated admin profile
   * @returns {Promise<object>} UserResponse
   */
  async getCurrentAdmin() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Clear authentication state on logout
   */
  logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  /**
   * Check if token exists in storage
   */
  hasToken() {
    return !!localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  /**
   * Get cached user profile
   */
  getCachedUser() {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },
};


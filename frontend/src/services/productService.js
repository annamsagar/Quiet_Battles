import api from './api';

export const productService = {
  // Public Storefront Endpoints
  async getPublicProducts(search) {
    const params = search ? { search } : {};
    const response = await api.get('/public/products', { params });
    return response.data;
  },

  async getPublicProductBySlug(slug) {
    const response = await api.get(`/public/products/${slug}`);
    return response.data;
  },

  // Admin Management Endpoints
  async getAllProducts(search) {
    const params = search ? { search } : {};
    const response = await api.get('/products', { params });
    return response.data;
  },

  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async getProductBySlug(slug) {
    const response = await api.get(`/products/slug/${slug}`);
    return response.data;
  },

  async getProductsBySeries(seriesId) {
    const response = await api.get(`/products/series/${seriesId}`);
    return response.data;
  },

  async createProduct(data) {
    const response = await api.post('/products', data);
    return response.data;
  },

  async updateProduct(id, data) {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  async deleteProduct(id) {
    await api.delete(`/products/${id}`);
    return true;
  },
};


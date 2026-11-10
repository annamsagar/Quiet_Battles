import api from './api';

export const seriesService = {
  // Public Storefront Endpoints
  async getPublicSeries() {
    const response = await api.get('/public/series');
    return response.data;
  },

  async getPublicSeriesBySlug(slug) {
    const response = await api.get(`/public/series/${slug}`);
    return response.data;
  },

  // Admin Management Endpoints
  async getAllSeries() {
    const response = await api.get('/series');
    return response.data;
  },

  async getSeriesById(id) {
    const response = await api.get(`/series/${id}`);
    return response.data;
  },

  async getSeriesBySlug(slug) {
    const response = await api.get(`/series/slug/${slug}`);
    return response.data;
  },

  async createSeries(data) {
    const response = await api.post('/series', data);
    return response.data;
  },

  async updateSeries(id, data) {
    const response = await api.put(`/series/${id}`, data);
    return response.data;
  },

  async deleteSeries(id) {
    await api.delete(`/series/${id}`);
    return true;
  },
};

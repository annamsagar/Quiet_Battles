import api from './api';

export const chapterService = {
  // Public Storefront Endpoints
  async getPublicChaptersBySeries(seriesSlug) {
    const response = await api.get(`/public/series/${seriesSlug}/chapters`);
    return response.data;
  },

  async getPublicChapter(seriesSlug, chapterSlug) {
    const response = await api.get(`/public/chapters/${seriesSlug}/${chapterSlug}`);
    return response.data;
  },

  // Admin Management Endpoints
  async getAllChapters() {
    const response = await api.get('/chapters');
    return response.data;
  },

  async getChaptersBySeries(seriesId) {
    const response = await api.get(`/chapters/series/${seriesId}`);
    return response.data;
  },

  async getChapterById(id) {
    const response = await api.get(`/chapters/${id}`);
    return response.data;
  },

  async getChapterBySlug(seriesSlug, chapterSlug) {
    const response = await api.get(`/chapters/slug/${seriesSlug}/${chapterSlug}`);
    return response.data;
  },

  async createChapter(data) {
    const response = await api.post('/chapters', data);
    return response.data;
  },

  async updateChapter(id, data) {
    const response = await api.put(`/chapters/${id}`, data);
    return response.data;
  },

  async deleteChapter(id) {
    await api.delete(`/chapters/${id}`);
    return true;
  },
};


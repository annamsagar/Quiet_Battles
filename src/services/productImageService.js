import api from './api';

export const productImageService = {
  async getProductImages(productId) {
    const response = await api.get(`/products/${productId}/images`);
    return response.data;
  },

  async addProductImage(productId, data) {
    const response = await api.post(`/products/${productId}/images`, data);
    return response.data;
  },

  async updateProductImage(productId, imageId, data) {
    const response = await api.put(`/products/${productId}/images/${imageId}`, data);
    return response.data;
  },

  async deleteProductImage(productId, imageId) {
    await api.delete(`/products/${productId}/images/${imageId}`);
    return true;
  },
};


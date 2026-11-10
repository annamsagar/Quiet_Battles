package com.quietbattles.service;

import com.quietbattles.dto.request.ProductRequest;
import com.quietbattles.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(Long id, ProductRequest request);

    ProductResponse getProductById(Long id);

    ProductResponse getProductBySlug(String slug);

    List<ProductResponse> getAllProducts();

    List<ProductResponse> getAllProducts(String search);

    List<ProductResponse> getProductsBySeries(Long seriesId);

    void deleteProduct(Long id);
}

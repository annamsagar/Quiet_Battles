package com.quietbattles.service;

import com.quietbattles.dto.request.ProductImageRequest;
import com.quietbattles.dto.response.ProductImageResponse;

import java.util.List;

public interface ProductImageService {

    ProductImageResponse addImage(Long productId, ProductImageRequest request);

    ProductImageResponse updateImage(Long productId, Long imageId, ProductImageRequest request);

    void deleteImage(Long productId, Long imageId);

    List<ProductImageResponse> getImagesByProduct(Long productId);
}

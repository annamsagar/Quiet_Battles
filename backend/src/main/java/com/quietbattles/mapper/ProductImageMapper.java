package com.quietbattles.mapper;

import com.quietbattles.dto.request.ProductImageRequest;
import com.quietbattles.dto.response.ProductImageResponse;
import com.quietbattles.entity.Product;
import com.quietbattles.entity.ProductImage;
import org.springframework.stereotype.Component;

@Component
public class ProductImageMapper {

    public ProductImageResponse toResponse(ProductImage image) {
        if (image == null) {
            return null;
        }

        Long productId = image.getProduct() != null ? image.getProduct().getId() : null;

        return new ProductImageResponse(
                image.getId(),
                productId,
                image.getImageUrl(),
                image.getAltText(),
                image.getDisplayOrder(),
                image.getCreatedAt()
        );
    }

    public ProductImage toEntity(ProductImageRequest request, Product product) {
        if (request == null) {
            return null;
        }

        ProductImage image = new ProductImage();
        image.setImageUrl(request.getImageUrl());
        image.setAltText(request.getAltText());
        image.setDisplayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0);
        image.setProduct(product);
        return image;
    }

    public void updateEntity(ProductImage image, ProductImageRequest request) {
        if (image == null || request == null) {
            return;
        }

        image.setImageUrl(request.getImageUrl());
        image.setAltText(request.getAltText());
        if (request.getDisplayOrder() != null) {
            image.setDisplayOrder(request.getDisplayOrder());
        }
    }
}


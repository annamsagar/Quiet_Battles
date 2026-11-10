package com.quietbattles.mapper;

import com.quietbattles.dto.request.ProductRequest;
import com.quietbattles.dto.response.ProductImageResponse;
import com.quietbattles.dto.response.ProductResponse;
import com.quietbattles.entity.Product;
import com.quietbattles.entity.Series;
import com.quietbattles.enums.ContentStatus;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    private final ProductImageMapper productImageMapper;

    public ProductMapper(ProductImageMapper productImageMapper) {
        this.productImageMapper = productImageMapper;
    }

    public ProductResponse toResponse(Product product) {
        if (product == null) {
            return null;
        }

        Long seriesId = product.getSeries() != null ? product.getSeries().getId() : null;
        String seriesTitle = product.getSeries() != null ? product.getSeries().getTitle() : null;

        List<ProductImageResponse> imageResponses = product.getImages() != null
                ? product.getImages().stream()
                        .map(productImageMapper::toResponse)
                        .collect(Collectors.toList())
                : Collections.emptyList();

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getSlug(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory(),
                product.getStockQuantity(),
                product.getSizes() != null ? new HashSet<>(product.getSizes()) : new HashSet<>(),
                product.getStatus(),
                seriesId,
                seriesTitle,
                imageResponses,
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }

    public Product toEntity(ProductRequest request, Series series) {
        if (request == null) {
            return null;
        }

        Product product = new Product();
        product.setName(request.getName());
        product.setSlug(request.getSlug());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setStockQuantity(request.getStockQuantity() != null ? request.getStockQuantity() : 0);
        product.setSizes(request.getAvailableSizes() != null ? new HashSet<>(request.getAvailableSizes()) : new HashSet<>());
        product.setStatus(request.getStatus() != null ? request.getStatus() : ContentStatus.DRAFT);
        product.setSeries(series);
        return product;
    }

    public void updateEntity(Product product, ProductRequest request, Series series) {
        if (product == null || request == null) {
            return;
        }

        product.setName(request.getName());
        product.setSlug(request.getSlug());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        if (request.getStockQuantity() != null) {
            product.setStockQuantity(request.getStockQuantity());
        }
        if (request.getAvailableSizes() != null) {
            product.setSizes(new HashSet<>(request.getAvailableSizes()));
        }
        if (request.getStatus() != null) {
            product.setStatus(request.getStatus());
        }
        if (series != null) {
            product.setSeries(series);
        }
    }
}


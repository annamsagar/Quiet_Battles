package com.quietbattles.service.impl;

import com.quietbattles.dto.request.ProductImageRequest;
import com.quietbattles.dto.response.ProductImageResponse;
import com.quietbattles.entity.Product;
import com.quietbattles.entity.ProductImage;
import com.quietbattles.exception.BadRequestException;
import com.quietbattles.exception.ResourceNotFoundException;
import com.quietbattles.mapper.ProductImageMapper;
import com.quietbattles.repository.ProductImageRepository;
import com.quietbattles.repository.ProductRepository;
import com.quietbattles.service.ProductImageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;
    private final ProductImageMapper productImageMapper;

    public ProductImageServiceImpl(
            ProductImageRepository productImageRepository,
            ProductRepository productRepository,
            ProductImageMapper productImageMapper) {
        this.productImageRepository = productImageRepository;
        this.productRepository = productRepository;
        this.productImageMapper = productImageMapper;
    }

    @Override
    @Transactional
    public ProductImageResponse addImage(Long productId, ProductImageRequest request) {
        // Business Rule: Product must exist
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        ProductImage image = productImageMapper.toEntity(request, product);
        product.addImage(image);
        ProductImage savedImage = productImageRepository.save(image);
        return productImageMapper.toResponse(savedImage);
    }

    @Override
    @Transactional
    public ProductImageResponse updateImage(Long productId, Long imageId, ProductImageRequest request) {
        // Business Rule: Product must exist
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product", "id", productId);
        }

        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("ProductImage", "id", imageId));

        // Business Rule: Prevent updating an image belonging to another Product
        if (image.getProduct() == null || !image.getProduct().getId().equals(productId)) {
            throw new BadRequestException(String.format(
                    "Image with ID %d does not belong to product with ID %d", imageId, productId
            ));
        }

        productImageMapper.updateEntity(image, request);
        ProductImage updatedImage = productImageRepository.save(image);
        return productImageMapper.toResponse(updatedImage);
    }

    @Override
    @Transactional
    public void deleteImage(Long productId, Long imageId) {
        // Business Rule: Product must exist
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product", "id", productId);
        }

        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("ProductImage", "id", imageId));

        // Business Rule: Prevent deleting an image belonging to another Product
        if (image.getProduct() == null || !image.getProduct().getId().equals(productId)) {
            throw new BadRequestException(String.format(
                    "Image with ID %d does not belong to product with ID %d", imageId, productId
            ));
        }

        image.getProduct().removeImage(image);
        productImageRepository.delete(image);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductImageResponse> getImagesByProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product", "id", productId);
        }

        return productImageRepository.findByProductIdOrderByDisplayOrderAsc(productId).stream()
                .map(productImageMapper::toResponse)
                .collect(Collectors.toList());
    }
}

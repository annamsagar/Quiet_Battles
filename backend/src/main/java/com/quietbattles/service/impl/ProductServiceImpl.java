package com.quietbattles.service.impl;

import com.quietbattles.dto.request.ProductRequest;
import com.quietbattles.dto.response.ProductResponse;
import com.quietbattles.entity.Chapter;
import com.quietbattles.entity.Product;
import com.quietbattles.entity.Series;
import com.quietbattles.exception.BadRequestException;
import com.quietbattles.exception.DuplicateResourceException;
import com.quietbattles.exception.ResourceNotFoundException;
import com.quietbattles.mapper.ProductMapper;
import com.quietbattles.repository.ChapterRepository;
import com.quietbattles.repository.ProductRepository;
import com.quietbattles.repository.SeriesRepository;
import com.quietbattles.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private static final Set<String> ALLOWED_SIZES = Set.of("S", "M", "L", "XL", "XXL");

    private final ProductRepository productRepository;
    private final SeriesRepository seriesRepository;
    private final ChapterRepository chapterRepository;
    private final ProductMapper productMapper;

    public ProductServiceImpl(
            ProductRepository productRepository,
            SeriesRepository seriesRepository,
            ChapterRepository chapterRepository,
            ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.seriesRepository = seriesRepository;
        this.chapterRepository = chapterRepository;
        this.productMapper = productMapper;
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        validateProductBusinessRules(request);

        // Business Rule 1: Slug must be unique
        if (productRepository.existsBySlug(request.getSlug())) {
            throw new DuplicateResourceException("Product", "slug", request.getSlug());
        }

        // Business Rule 3: Product must belong to an existing Series
        Series series = seriesRepository.findById(request.getSeriesId())
                .orElseThrow(() -> new ResourceNotFoundException("Series", "id", request.getSeriesId()));

        Product product = productMapper.toEntity(request, series);
        Product savedProduct = productRepository.save(product);
        return productMapper.toResponse(savedProduct);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        validateProductBusinessRules(request);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        // Business Rule 1: Slug uniqueness check if updated
        if (!product.getSlug().equalsIgnoreCase(request.getSlug())
                && productRepository.existsBySlug(request.getSlug())) {
            throw new DuplicateResourceException("Product", "slug", request.getSlug());
        }

        // Business Rule 3: Series must exist
        Series series = seriesRepository.findById(request.getSeriesId())
                .orElseThrow(() -> new ResourceNotFoundException("Series", "id", request.getSeriesId()));

        productMapper.updateEntity(product, request, series);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toResponse(updatedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        return productMapper.toResponse(product);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "slug", slug));
        return productMapper.toResponse(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {
        return getAllProducts(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts(String search) {
        List<Product> products;
        if (search != null && !search.trim().isEmpty()) {
            products = productRepository.findByNameContainingIgnoreCase(search.trim());
        } else {
            products = productRepository.findAll();
        }

        return products.stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsBySeries(Long seriesId) {
        if (!seriesRepository.existsById(seriesId)) {
            throw new ResourceNotFoundException("Series", "id", seriesId);
        }
        return productRepository.findBySeriesId(seriesId).stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        // Decouple any chapters referencing this product before deletion
        for (Chapter chapter : product.getChapters()) {
            chapter.setProduct(null);
            chapterRepository.save(chapter);
        }

        productRepository.delete(product);
    }

    private void validateProductBusinessRules(ProductRequest request) {
        // Business Rule 7 & 8: Price must be positive BigDecimal
        if (request.getPrice() == null || request.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BadRequestException("Product price must be greater than zero.");
        }

        // Business Rule 7: Stock quantity cannot be negative
        if (request.getStockQuantity() == null || request.getStockQuantity() < 0) {
            throw new BadRequestException("Stock quantity cannot be negative.");
        }

        // Business Rule 4: Validate that availableSizes contains only S, M, L, XL, XXL
        if (request.getAvailableSizes() == null || request.getAvailableSizes().isEmpty()) {
            throw new BadRequestException("At least one available size must be provided.");
        }

        for (String size : request.getAvailableSizes()) {
            if (!ALLOWED_SIZES.contains(size.toUpperCase())) {
                throw new BadRequestException(String.format(
                        "Invalid size: '%s'. Allowed sizes are: %s", size, ALLOWED_SIZES
                ));
            }
        }
    }
}

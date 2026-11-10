package com.quietbattles.controller;

import com.quietbattles.dto.request.ProductRequest;
import com.quietbattles.dto.response.ProductResponse;
import com.quietbattles.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "Product Management", description = "Endpoints for administering QUIET BATTLES™ luxury garments and products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create Product", description = "Creates a new luxury apparel item under a Series")
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        ProductResponse response = productService.createProduct(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get All Products", description = "Retrieves all products, with optional case-insensitive name search")
    public ResponseEntity<List<ProductResponse>> getAllProducts(
            @Parameter(description = "Optional keyword to search product names (e.g. 'armor')")
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(productService.getAllProducts(search));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Product by ID", description = "Retrieves a specific product by its numerical ID")
    public ResponseEntity<ProductResponse> getProductById(
            @Parameter(description = "Primary key ID of the product") @PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/slug/{slug}")
    @Operation(summary = "Get Product by Slug", description = "Retrieves a specific product by its unique slug")
    public ResponseEntity<ProductResponse> getProductBySlug(
            @Parameter(description = "Unique URL slug of the product") @PathVariable String slug) {
        return ResponseEntity.ok(productService.getProductBySlug(slug));
    }

    @GetMapping("/series/{seriesId}")
    @Operation(summary = "Get Products by Series ID", description = "Retrieves all garments grouped under a series")
    public ResponseEntity<List<ProductResponse>> getProductsBySeries(
            @Parameter(description = "Primary key ID of the parent series") @PathVariable Long seriesId) {
        return ResponseEntity.ok(productService.getProductsBySeries(seriesId));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Product", description = "Updates an existing product item by ID")
    public ResponseEntity<ProductResponse> updateProduct(
            @Parameter(description = "Primary key ID of the product") @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete Product", description = "Deletes a luxury product by ID, decoupling associated chapters")
    public ResponseEntity<Void> deleteProduct(
            @Parameter(description = "Primary key ID of the product") @PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}


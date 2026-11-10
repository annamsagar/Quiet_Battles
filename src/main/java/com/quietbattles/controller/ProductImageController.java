package com.quietbattles.controller;

import com.quietbattles.dto.request.ProductImageRequest;
import com.quietbattles.dto.response.ProductImageResponse;
import com.quietbattles.service.ProductImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products/{productId}/images")
@Tag(name = "Product Image Management", description = "Endpoints for managing lookbook and catalog photography URLs for products")
public class ProductImageController {

    private final ProductImageService productImageService;

    public ProductImageController(ProductImageService productImageService) {
        this.productImageService = productImageService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Add Product Image",
            description = "Attaches a new publicly accessible image URL with alt text to a garment",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<ProductImageResponse> addImage(
            @Parameter(description = "Primary key ID of the product") @PathVariable Long productId,
            @Valid @RequestBody ProductImageRequest request) {
        ProductImageResponse response = productImageService.addImage(productId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get Product Images", description = "Retrieves all gallery imagery URLs for a garment in display order")
    public ResponseEntity<List<ProductImageResponse>> getProductImages(
            @Parameter(description = "Primary key ID of the product") @PathVariable Long productId) {
        return ResponseEntity.ok(productImageService.getImagesByProduct(productId));
    }

    @PutMapping("/{imageId}")
    @Operation(
            summary = "Update Product Image",
            description = "Updates image URL, alt text or display ordering for a product image",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<ProductImageResponse> updateImage(
            @Parameter(description = "Primary key ID of the product") @PathVariable Long productId,
            @Parameter(description = "Primary key ID of the image asset") @PathVariable Long imageId,
            @Valid @RequestBody ProductImageRequest request) {
        return ResponseEntity.ok(productImageService.updateImage(productId, imageId, request));
    }

    @DeleteMapping("/{imageId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            summary = "Delete Product Image",
            description = "Deletes an image URL asset from a product",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<Void> deleteImage(
            @Parameter(description = "Primary key ID of the product") @PathVariable Long productId,
            @Parameter(description = "Primary key ID of the image asset") @PathVariable Long imageId) {
        productImageService.deleteImage(productId, imageId);
        return ResponseEntity.noContent().build();
    }
}

package com.quietbattles.dto.response;

import java.time.LocalDateTime;

public class ProductImageResponse {

    private Long id;
    private Long productId;
    private String imageUrl;
    private String altText;
    private Integer displayOrder;
    private LocalDateTime createdAt;

    public ProductImageResponse() {
    }

    public ProductImageResponse(Long id, Long productId, String imageUrl, String altText,
                                Integer displayOrder, LocalDateTime createdAt) {
        this.id = id;
        this.productId = productId;
        this.imageUrl = imageUrl;
        this.altText = altText;
        this.displayOrder = displayOrder;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getAltText() {
        return altText;
    }

    public void setAltText(String altText) {
        this.altText = altText;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}


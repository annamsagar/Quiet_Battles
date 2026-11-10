package com.quietbattles.dto.request;

import com.quietbattles.validation.ValidImageUrl;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class ProductImageRequest {

    @NotBlank(message = "Image URL is required")
    @Size(max = 500, message = "Image URL cannot exceed 500 characters")
    @ValidImageUrl(required = true, message = "Image URL must be a valid HTTP or HTTPS URL under 500 characters")
    private String imageUrl;

    @Size(max = 255, message = "Alt text cannot exceed 255 characters")
    private String altText;

    @PositiveOrZero(message = "Display order must be zero or a positive integer")
    private Integer displayOrder = 0;

    public ProductImageRequest() {
    }

    public ProductImageRequest(String imageUrl, String altText, Integer displayOrder) {
        this.imageUrl = imageUrl;
        this.altText = altText;
        this.displayOrder = displayOrder != null ? displayOrder : 0;
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
}

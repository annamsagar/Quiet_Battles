package com.quietbattles.dto.request;

import com.quietbattles.enums.ContentStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

public class ProductRequest {

    @NotBlank(message = "Product name is required")
    @Size(max = 150, message = "Product name cannot exceed 150 characters")
    private String name;

    @NotBlank(message = "Product slug is required")
    @Size(max = 150, message = "Product slug cannot exceed 150 characters")
    @Pattern(
            regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
            message = "Slug must contain only lowercase alphanumeric characters and single hyphens"
    )
    private String slug;

    private String description;

    @NotNull(message = "Product price is required")
    @DecimalMin(value = "0.01", message = "Product price must be greater than zero")
    private BigDecimal price;

    @Size(max = 100, message = "Category cannot exceed 100 characters")
    private String category;

    @NotNull(message = "Stock quantity is required")
    @PositiveOrZero(message = "Stock quantity cannot be negative")
    private Integer stockQuantity = 0;

    @NotEmpty(message = "At least one available size must be provided")
    private Set<String> availableSizes = new HashSet<>();

    @NotNull(message = "Content status is required")
    private ContentStatus status = ContentStatus.DRAFT;

    @NotNull(message = "Series ID is required")
    @Positive(message = "Series ID must be a positive integer")
    private Long seriesId;

    public ProductRequest() {
    }

    public ProductRequest(String name, String slug, String description, BigDecimal price,
                          String category, Integer stockQuantity, Set<String> availableSizes,
                          ContentStatus status, Long seriesId) {
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.price = price;
        this.category = category;
        this.stockQuantity = stockQuantity != null ? stockQuantity : 0;
        this.availableSizes = availableSizes != null ? availableSizes : new HashSet<>();
        this.status = status != null ? status : ContentStatus.DRAFT;
        this.seriesId = seriesId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Set<String> getAvailableSizes() {
        return availableSizes;
    }

    public void setAvailableSizes(Set<String> availableSizes) {
        this.availableSizes = availableSizes;
    }

    public ContentStatus getStatus() {
        return status;
    }

    public void setStatus(ContentStatus status) {
        this.status = status;
    }

    public Long getSeriesId() {
        return seriesId;
    }

    public void setSeriesId(Long seriesId) {
        this.seriesId = seriesId;
    }
}


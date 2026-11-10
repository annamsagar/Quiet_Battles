package com.quietbattles.entity;

import com.quietbattles.enums.ContentStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Series Entity
 * Represents an editorial collection (e.g., SERIES 01 - THE GENTLE ARMOR™).
 * Contains multiple storytelling chapters and associated luxury garments.
 */
@Entity
@Table(
        name = "series",
        indexes = {
                @Index(name = "idx_series_slug", columnList = "slug", unique = true)
        }
)
public class Series {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 150, message = "Title cannot exceed 150 characters")
    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @NotBlank(message = "Slug is required")
    @Size(max = 150, message = "Slug cannot exceed 150 characters")
    @Column(name = "slug", nullable = false, unique = true, length = 150)
    private String slug;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Size(max = 500, message = "Cover image URL cannot exceed 500 characters")
    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    @NotNull(message = "Content status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private ContentStatus status = ContentStatus.DRAFT;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "series", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC, chapterNumber ASC")
    private List<Chapter> chapters = new ArrayList<>();

    @OneToMany(mappedBy = "series", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("id ASC")
    private List<Product> products = new ArrayList<>();

    public Series() {
    }

    public Series(String title, String slug, String description, String coverImageUrl, ContentStatus status) {
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.coverImageUrl = coverImageUrl;
        this.status = status != null ? status : ContentStatus.DRAFT;
    }

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
        if (this.status == null) {
            this.status = ContentStatus.DRAFT;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public void addChapter(Chapter chapter) {
        chapters.add(chapter);
        chapter.setSeries(this);
    }

    public void removeChapter(Chapter chapter) {
        chapters.remove(chapter);
        chapter.setSeries(null);
    }

    public void addProduct(Product product) {
        products.add(product);
        product.setSeries(this);
    }

    public void removeProduct(Product product) {
        products.remove(product);
        product.setSeries(null);
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public ContentStatus getStatus() {
        return status;
    }

    public void setStatus(ContentStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(List<Chapter> chapters) {
        this.chapters = chapters;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Series series = (Series) o;
        return id != null && Objects.equals(id, series.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Series{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", slug='" + slug + '\'' +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

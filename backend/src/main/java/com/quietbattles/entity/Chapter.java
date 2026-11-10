package com.quietbattles.entity;

import com.quietbattles.enums.ContentStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Chapter Entity
 * Represents an editorial narrative chapter within a Series (e.g. Chapter 01: The Silence).
 * May optionally be linked to a featured luxury Product.
 */
@Entity
@Table(
        name = "chapters",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_series_chapter_number",
                        columnNames = {"series_id", "chapter_number"}
                )
        },
        indexes = {
                @Index(name = "idx_chapter_slug", columnList = "slug"),
                @Index(name = "idx_chapter_series", columnList = "series_id")
        }
)
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Chapter title is required")
    @Size(max = 150, message = "Chapter title cannot exceed 150 characters")
    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @NotBlank(message = "Slug is required")
    @Size(max = 150, message = "Slug cannot exceed 150 characters")
    @Column(name = "slug", nullable = false, length = 150)
    private String slug;

    @NotNull(message = "Chapter number is required")
    @Min(value = 1, message = "Chapter number must be at least 1")
    @Column(name = "chapter_number", nullable = false)
    private Integer chapterNumber;

    @Size(max = 150, message = "Theme cannot exceed 150 characters")
    @Column(name = "theme", length = 150)
    private String theme;

    @Size(max = 500, message = "Short description cannot exceed 500 characters")
    @Column(name = "short_description", length = 500)
    private String shortDescription;

    @Size(max = 500, message = "Opening quote cannot exceed 500 characters")
    @Column(name = "opening_quote", length = 500)
    private String openingQuote;

    @Column(name = "story_content", columnDefinition = "TEXT")
    private String storyContent;

    @Size(max = 500, message = "Cover image URL cannot exceed 500 characters")
    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    @Size(max = 500, message = "Secondary image URL cannot exceed 500 characters")
    @Column(name = "secondary_image_url", length = 500)
    private String secondaryImageUrl;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @NotNull(message = "Content status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private ContentStatus status = ContentStatus.DRAFT;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @NotNull(message = "Series is required for a Chapter")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "series_id", nullable = false)
    private Series series;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "product_id", nullable = true)
    private Product product;

    public Chapter() {
    }

    public Chapter(String title, String slug, Integer chapterNumber, String theme, String shortDescription,
                   String openingQuote, String storyContent, String coverImageUrl, ContentStatus status) {
        this.title = title;
        this.slug = slug;
        this.chapterNumber = chapterNumber;
        this.theme = theme;
        this.shortDescription = shortDescription;
        this.openingQuote = openingQuote;
        this.storyContent = storyContent;
        this.coverImageUrl = coverImageUrl;
        this.status = status != null ? status : ContentStatus.DRAFT;
        this.displayOrder = chapterNumber != null ? chapterNumber : 0;
    }

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
        if (this.status == null) {
            this.status = ContentStatus.DRAFT;
        }
        if (this.displayOrder == null) {
            this.displayOrder = this.chapterNumber != null ? this.chapterNumber : 0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
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

    public Integer getChapterNumber() {
        return chapterNumber;
    }

    public void setChapterNumber(Integer chapterNumber) {
        this.chapterNumber = chapterNumber;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getOpeningQuote() {
        return openingQuote;
    }

    public void setOpeningQuote(String openingQuote) {
        this.openingQuote = openingQuote;
    }

    public String getStoryContent() {
        return storyContent;
    }

    public void setStoryContent(String storyContent) {
        this.storyContent = storyContent;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public String getSecondaryImageUrl() {
        return secondaryImageUrl;
    }

    public void setSecondaryImageUrl(String secondaryImageUrl) {
        this.secondaryImageUrl = secondaryImageUrl;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
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

    public Series getSeries() {
        return series;
    }

    public void setSeries(Series series) {
        this.series = series;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chapter chapter = (Chapter) o;
        return id != null && Objects.equals(id, chapter.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Chapter{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", slug='" + slug + '\'' +
                ", chapterNumber=" + chapterNumber +
                ", theme='" + theme + '\'' +
                ", displayOrder=" + displayOrder +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

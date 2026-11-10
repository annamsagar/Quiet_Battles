package com.quietbattles.dto.request;

import com.quietbattles.enums.ContentStatus;
import com.quietbattles.validation.ValidImageUrl;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class ChapterRequest {

    @NotBlank(message = "Chapter title is required")
    @Size(max = 150, message = "Chapter title cannot exceed 150 characters")
    private String title;

    @NotBlank(message = "Chapter slug is required")
    @Size(max = 150, message = "Chapter slug cannot exceed 150 characters")
    @Pattern(
            regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
            message = "Slug must contain only lowercase alphanumeric characters and single hyphens"
    )
    private String slug;

    @NotNull(message = "Chapter number is required")
    @Positive(message = "Chapter number must be a positive integer greater than zero")
    private Integer chapterNumber;

    @Size(max = 150, message = "Theme cannot exceed 150 characters")
    private String theme;

    @Size(max = 500, message = "Short description cannot exceed 500 characters")
    private String shortDescription;

    @Size(max = 500, message = "Opening quote cannot exceed 500 characters")
    private String openingQuote;

    private String storyContent;

    @Size(max = 500, message = "Cover image URL cannot exceed 500 characters")
    @ValidImageUrl(required = false, message = "Cover image URL must be a valid HTTP or HTTPS URL under 500 characters")
    private String coverImageUrl;

    @Size(max = 500, message = "Secondary image URL cannot exceed 500 characters")
    @ValidImageUrl(required = false, message = "Secondary image URL must be a valid HTTP or HTTPS URL under 500 characters")
    private String secondaryImageUrl;

    @PositiveOrZero(message = "Display order must be zero or a positive integer")
    private Integer displayOrder = 0;

    @NotNull(message = "Content status is required")
    private ContentStatus status = ContentStatus.DRAFT;

    @NotNull(message = "Series ID is required")
    @Positive(message = "Series ID must be a positive integer")
    private Long seriesId;

    @Positive(message = "Product ID must be a positive integer if provided")
    private Long productId;

    public ChapterRequest() {
    }

    public ChapterRequest(String title, String slug, Integer chapterNumber, String theme,
                          String shortDescription, String openingQuote, String storyContent,
                          String coverImageUrl, String secondaryImageUrl, Integer displayOrder,
                          ContentStatus status, Long seriesId, Long productId) {
        this.title = title;
        this.slug = slug;
        this.chapterNumber = chapterNumber;
        this.theme = theme;
        this.shortDescription = shortDescription;
        this.openingQuote = openingQuote;
        this.storyContent = storyContent;
        this.coverImageUrl = coverImageUrl;
        this.secondaryImageUrl = secondaryImageUrl;
        this.displayOrder = displayOrder != null ? displayOrder : (chapterNumber != null ? chapterNumber : 0);
        this.status = status != null ? status : ContentStatus.DRAFT;
        this.seriesId = seriesId;
        this.productId = productId;
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

    public Long getSeriesId() {
        return seriesId;
    }

    public void setSeriesId(Long seriesId) {
        this.seriesId = seriesId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}

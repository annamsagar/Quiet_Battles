package com.quietbattles.dto.response;

import com.quietbattles.enums.ContentStatus;

import java.time.LocalDateTime;

public class ChapterResponse {

    private Long id;
    private String title;
    private String slug;
    private Integer chapterNumber;
    private String theme;
    private String shortDescription;
    private String openingQuote;
    private String storyContent;
    private String coverImageUrl;
    private String secondaryImageUrl;
    private Integer displayOrder;
    private ContentStatus status;
    private Long seriesId;
    private String seriesTitle;
    private Long productId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ChapterResponse() {
    }

    public ChapterResponse(Long id, String title, String slug, Integer chapterNumber,
                           String theme, String shortDescription, String openingQuote,
                           String storyContent, String coverImageUrl, String secondaryImageUrl,
                           Integer displayOrder, ContentStatus status, Long seriesId,
                           String seriesTitle, Long productId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.chapterNumber = chapterNumber;
        this.theme = theme;
        this.shortDescription = shortDescription;
        this.openingQuote = openingQuote;
        this.storyContent = storyContent;
        this.coverImageUrl = coverImageUrl;
        this.secondaryImageUrl = secondaryImageUrl;
        this.displayOrder = displayOrder;
        this.status = status;
        this.seriesId = seriesId;
        this.seriesTitle = seriesTitle;
        this.productId = productId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

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

    public Long getSeriesId() {
        return seriesId;
    }

    public void setSeriesId(Long seriesId) {
        this.seriesId = seriesId;
    }

    public String getSeriesTitle() {
        return seriesTitle;
    }

    public void setSeriesTitle(String seriesTitle) {
        this.seriesTitle = seriesTitle;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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
}

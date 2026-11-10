package com.quietbattles.dto.request;

import com.quietbattles.enums.ContentStatus;
import com.quietbattles.validation.ValidImageUrl;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class SeriesRequest {

    @NotBlank(message = "Series title is required")
    @Size(max = 150, message = "Series title cannot exceed 150 characters")
    private String title;

    @NotBlank(message = "Series slug is required")
    @Size(max = 150, message = "Series slug cannot exceed 150 characters")
    @Pattern(
            regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
            message = "Slug must contain only lowercase alphanumeric characters and single hyphens (e.g. 'series-01')"
    )
    private String slug;

    private String description;

    @Size(max = 500, message = "Cover image URL cannot exceed 500 characters")
    @ValidImageUrl(required = false, message = "Cover image URL must be a valid HTTP or HTTPS URL under 500 characters")
    private String coverImageUrl;

    @NotNull(message = "Content status is required")
    private ContentStatus status = ContentStatus.DRAFT;

    public SeriesRequest() {
    }

    public SeriesRequest(String title, String slug, String description, String coverImageUrl, ContentStatus status) {
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.coverImageUrl = coverImageUrl;
        this.status = status;
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
}

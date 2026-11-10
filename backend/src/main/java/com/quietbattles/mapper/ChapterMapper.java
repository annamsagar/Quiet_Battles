package com.quietbattles.mapper;

import com.quietbattles.dto.request.ChapterRequest;
import com.quietbattles.dto.response.ChapterResponse;
import com.quietbattles.entity.Chapter;
import com.quietbattles.entity.Product;
import com.quietbattles.entity.Series;
import com.quietbattles.enums.ContentStatus;
import org.springframework.stereotype.Component;

@Component
public class ChapterMapper {

    public ChapterResponse toResponse(Chapter chapter) {
        if (chapter == null) {
            return null;
        }

        Long seriesId = chapter.getSeries() != null ? chapter.getSeries().getId() : null;
        String seriesTitle = chapter.getSeries() != null ? chapter.getSeries().getTitle() : null;
        Long productId = chapter.getProduct() != null ? chapter.getProduct().getId() : null;

        return new ChapterResponse(
                chapter.getId(),
                chapter.getTitle(),
                chapter.getSlug(),
                chapter.getChapterNumber(),
                chapter.getTheme(),
                chapter.getShortDescription(),
                chapter.getOpeningQuote(),
                chapter.getStoryContent(),
                chapter.getCoverImageUrl(),
                chapter.getSecondaryImageUrl(),
                chapter.getDisplayOrder(),
                chapter.getStatus(),
                seriesId,
                seriesTitle,
                productId,
                chapter.getCreatedAt(),
                chapter.getUpdatedAt()
        );
    }

    public Chapter toEntity(ChapterRequest request, Series series, Product product) {
        if (request == null) {
            return null;
        }

        Chapter chapter = new Chapter();
        chapter.setTitle(request.getTitle());
        chapter.setSlug(request.getSlug());
        chapter.setChapterNumber(request.getChapterNumber());
        chapter.setTheme(request.getTheme());
        chapter.setShortDescription(request.getShortDescription());
        chapter.setOpeningQuote(request.getOpeningQuote());
        chapter.setStoryContent(request.getStoryContent());
        chapter.setCoverImageUrl(request.getCoverImageUrl());
        chapter.setSecondaryImageUrl(request.getSecondaryImageUrl());
        chapter.setDisplayOrder(
                request.getDisplayOrder() != null
                        ? request.getDisplayOrder()
                        : (request.getChapterNumber() != null ? request.getChapterNumber() : 0)
        );
        chapter.setStatus(request.getStatus() != null ? request.getStatus() : ContentStatus.DRAFT);
        chapter.setSeries(series);
        chapter.setProduct(product);
        return chapter;
    }

    public void updateEntity(Chapter chapter, ChapterRequest request, Series series, Product product) {
        if (chapter == null || request == null) {
            return;
        }

        chapter.setTitle(request.getTitle());
        chapter.setSlug(request.getSlug());
        chapter.setChapterNumber(request.getChapterNumber());
        chapter.setTheme(request.getTheme());
        chapter.setShortDescription(request.getShortDescription());
        chapter.setOpeningQuote(request.getOpeningQuote());
        chapter.setStoryContent(request.getStoryContent());
        chapter.setCoverImageUrl(request.getCoverImageUrl());
        chapter.setSecondaryImageUrl(request.getSecondaryImageUrl());
        if (request.getDisplayOrder() != null) {
            chapter.setDisplayOrder(request.getDisplayOrder());
        }
        if (request.getStatus() != null) {
            chapter.setStatus(request.getStatus());
        }
        if (series != null) {
            chapter.setSeries(series);
        }
        chapter.setProduct(product); // Product reference is optional and can be updated to null or new product
    }
}


package com.quietbattles.service;

import com.quietbattles.dto.response.ChapterResponse;
import com.quietbattles.dto.response.ProductResponse;
import com.quietbattles.dto.response.SeriesResponse;

import java.util.List;

public interface PublicContentService {

    List<SeriesResponse> getPublicSeries();

    SeriesResponse getPublicSeriesBySlug(String slug);

    List<ChapterResponse> getPublicChaptersBySeriesSlug(String seriesSlug);

    ChapterResponse getPublicChapter(String seriesSlug, String chapterSlug);

    List<ProductResponse> getPublicProducts(String search);

    ProductResponse getPublicProductBySlug(String slug);
}


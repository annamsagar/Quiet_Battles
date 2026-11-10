package com.quietbattles.service;

import com.quietbattles.dto.request.ChapterRequest;
import com.quietbattles.dto.response.ChapterResponse;

import java.util.List;

public interface ChapterService {

    ChapterResponse createChapter(ChapterRequest request);

    ChapterResponse updateChapter(Long id, ChapterRequest request);

    ChapterResponse getChapterById(Long id);

    ChapterResponse getChapterBySlug(String slug);

    ChapterResponse getChapterBySlugAndSeriesSlug(String chapterSlug, String seriesSlug);

    List<ChapterResponse> getChaptersBySeries(Long seriesId);

    List<ChapterResponse> getAllChapters();

    void deleteChapter(Long id);
}


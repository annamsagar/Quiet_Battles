package com.quietbattles.service.impl;

import com.quietbattles.dto.request.ChapterRequest;
import com.quietbattles.dto.response.ChapterResponse;
import com.quietbattles.entity.Chapter;
import com.quietbattles.entity.Product;
import com.quietbattles.entity.Series;
import com.quietbattles.exception.BadRequestException;
import com.quietbattles.exception.DuplicateResourceException;
import com.quietbattles.exception.ResourceNotFoundException;
import com.quietbattles.mapper.ChapterMapper;
import com.quietbattles.repository.ChapterRepository;
import com.quietbattles.repository.ProductRepository;
import com.quietbattles.repository.SeriesRepository;
import com.quietbattles.service.ChapterService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChapterServiceImpl implements ChapterService {

    private final ChapterRepository chapterRepository;
    private final SeriesRepository seriesRepository;
    private final ProductRepository productRepository;
    private final ChapterMapper chapterMapper;

    public ChapterServiceImpl(
            ChapterRepository chapterRepository,
            SeriesRepository seriesRepository,
            ProductRepository productRepository,
            ChapterMapper chapterMapper) {
        this.chapterRepository = chapterRepository;
        this.seriesRepository = seriesRepository;
        this.productRepository = productRepository;
        this.chapterMapper = chapterMapper;
    }

    @Override
    @Transactional
    public ChapterResponse createChapter(ChapterRequest request) {
        // Business Rule 1: Slug must be unique
        if (chapterRepository.existsBySlug(request.getSlug())) {
            throw new DuplicateResourceException("Chapter", "slug", request.getSlug());
        }

        // Business Rule 2: Chapter must belong to an existing Series
        Series series = seriesRepository.findById(request.getSeriesId())
                .orElseThrow(() -> new ResourceNotFoundException("Series", "id", request.getSeriesId()));

        // Business Rule 6: Do not allow duplicate chapter numbers within the same Series
        if (chapterRepository.existsBySeriesIdAndChapterNumber(series.getId(), request.getChapterNumber())) {
            throw new DuplicateResourceException(String.format(
                    "Chapter number %d already exists within Series '%s'",
                    request.getChapterNumber(), series.getTitle()
            ));
        }

        // Business Rule 4: Product is optional, but if provided, must exist
        Product product = null;
        if (request.getProductId() != null) {
            product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "id", request.getProductId()));
        }

        Chapter chapter = chapterMapper.toEntity(request, series, product);
        Chapter savedChapter = chapterRepository.save(chapter);
        return chapterMapper.toResponse(savedChapter);
    }

    @Override
    @Transactional
    public ChapterResponse updateChapter(Long id, ChapterRequest request) {
        Chapter chapter = chapterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter", "id", id));

        // Business Rule 1: Slug uniqueness check if updated
        if (!chapter.getSlug().equalsIgnoreCase(request.getSlug())
                && chapterRepository.existsBySlug(request.getSlug())) {
            throw new DuplicateResourceException("Chapter", "slug", request.getSlug());
        }

        // Business Rule 2: Verify Series exists
        Series series = seriesRepository.findById(request.getSeriesId())
                .orElseThrow(() -> new ResourceNotFoundException("Series", "id", request.getSeriesId()));

        // Business Rule 6: Check duplicate chapter number if changed
        boolean seriesChanged = !chapter.getSeries().getId().equals(request.getSeriesId());
        boolean chapterNumberChanged = !chapter.getChapterNumber().equals(request.getChapterNumber());

        if ((seriesChanged || chapterNumberChanged)
                && chapterRepository.existsBySeriesIdAndChapterNumber(series.getId(), request.getChapterNumber())) {
            throw new DuplicateResourceException(String.format(
                    "Chapter number %d already exists within Series '%s'",
                    request.getChapterNumber(), series.getTitle()
            ));
        }

        // Business Rule 4: Product reference optional, verify if provided
        Product product = null;
        if (request.getProductId() != null) {
            product = productRepository.findById(request.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "id", request.getProductId()));
        }

        chapterMapper.updateEntity(chapter, request, series, product);
        Chapter updatedChapter = chapterRepository.save(chapter);
        return chapterMapper.toResponse(updatedChapter);
    }

    @Override
    @Transactional(readOnly = true)
    public ChapterResponse getChapterById(Long id) {
        Chapter chapter = chapterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter", "id", id));
        return chapterMapper.toResponse(chapter);
    }

    @Override
    @Transactional(readOnly = true)
    public ChapterResponse getChapterBySlug(String slug) {
        Chapter chapter = chapterRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter", "slug", slug));
        return chapterMapper.toResponse(chapter);
    }

    @Override
    @Transactional(readOnly = true)
    public ChapterResponse getChapterBySlugAndSeriesSlug(String chapterSlug, String seriesSlug) {
        Chapter chapter = chapterRepository.findBySlugAndSeriesSlug(chapterSlug, seriesSlug)
                .orElseThrow(() -> new ResourceNotFoundException(String.format(
                        "Chapter '%s' not found within Series '%s'", chapterSlug, seriesSlug
                )));
        return chapterMapper.toResponse(chapter);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChapterResponse> getChaptersBySeries(Long seriesId) {
        if (!seriesRepository.existsById(seriesId)) {
            throw new ResourceNotFoundException("Series", "id", seriesId);
        }
        return chapterRepository.findBySeriesIdOrderByDisplayOrderAscChapterNumberAsc(seriesId).stream()
                .map(chapterMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChapterResponse> getAllChapters() {
        return chapterRepository.findAll().stream()
                .map(chapterMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteChapter(Long id) {
        Chapter chapter = chapterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter", "id", id));
        chapterRepository.delete(chapter);
    }
}


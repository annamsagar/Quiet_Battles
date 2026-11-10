package com.quietbattles.service.impl;

import com.quietbattles.dto.request.SeriesRequest;
import com.quietbattles.dto.response.SeriesResponse;
import com.quietbattles.entity.Series;
import com.quietbattles.exception.BadRequestException;
import com.quietbattles.exception.DuplicateResourceException;
import com.quietbattles.exception.ResourceNotFoundException;
import com.quietbattles.mapper.SeriesMapper;
import com.quietbattles.repository.ChapterRepository;
import com.quietbattles.repository.ProductRepository;
import com.quietbattles.repository.SeriesRepository;
import com.quietbattles.service.SeriesService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeriesServiceImpl implements SeriesService {

    private final SeriesRepository seriesRepository;
    private final ChapterRepository chapterRepository;
    private final ProductRepository productRepository;
    private final SeriesMapper seriesMapper;

    public SeriesServiceImpl(
            SeriesRepository seriesRepository,
            ChapterRepository chapterRepository,
            ProductRepository productRepository,
            SeriesMapper seriesMapper) {
        this.seriesRepository = seriesRepository;
        this.chapterRepository = chapterRepository;
        this.productRepository = productRepository;
        this.seriesMapper = seriesMapper;
    }

    @Override
    @Transactional
    public SeriesResponse createSeries(SeriesRequest request) {
        if (seriesRepository.existsBySlug(request.getSlug())) {
            throw new DuplicateResourceException("Series", "slug", request.getSlug());
        }

        Series series = seriesMapper.toEntity(request);
        Series savedSeries = seriesRepository.save(series);
        return seriesMapper.toResponse(savedSeries);
    }

    @Override
    @Transactional
    public SeriesResponse updateSeries(Long id, SeriesRequest request) {
        Series series = seriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Series", "id", id));

        // If slug is changed, check uniqueness
        if (!series.getSlug().equalsIgnoreCase(request.getSlug())
                && seriesRepository.existsBySlug(request.getSlug())) {
            throw new DuplicateResourceException("Series", "slug", request.getSlug());
        }

        seriesMapper.updateEntity(series, request);
        Series updatedSeries = seriesRepository.save(series);
        return seriesMapper.toResponse(updatedSeries);
    }

    @Override
    @Transactional(readOnly = true)
    public SeriesResponse getSeriesById(Long id) {
        Series series = seriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Series", "id", id));
        return seriesMapper.toResponse(series);
    }

    @Override
    @Transactional(readOnly = true)
    public SeriesResponse getSeriesBySlug(String slug) {
        Series series = seriesRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Series", "slug", slug));
        return seriesMapper.toResponse(series);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SeriesResponse> getAllSeries() {
        return seriesRepository.findAll().stream()
                .map(seriesMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteSeries(Long id) {
        Series series = seriesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Series", "id", id));

        // Business Rule 9: Prevent accidental deletion if Chapters or Products still reference it
        long chapterCount = chapterRepository.countBySeriesId(id);
        long productCount = productRepository.countBySeriesId(id);

        if (chapterCount > 0 || productCount > 0) {
            throw new BadRequestException(String.format(
                    "Cannot delete series '%s' (ID: %d) because it still contains %d chapter(s) and %d product(s). " +
                            "Please remove or reassign associated content before deleting this series.",
                    series.getTitle(), id, chapterCount, productCount
            ));
        }

        seriesRepository.delete(series);
    }
}


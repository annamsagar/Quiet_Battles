package com.quietbattles.service.impl;

import com.quietbattles.dto.response.ChapterResponse;
import com.quietbattles.dto.response.ProductResponse;
import com.quietbattles.dto.response.SeriesResponse;
import com.quietbattles.entity.Chapter;
import com.quietbattles.entity.Product;
import com.quietbattles.entity.Series;
import com.quietbattles.enums.ContentStatus;
import com.quietbattles.exception.ResourceNotFoundException;
import com.quietbattles.mapper.ChapterMapper;
import com.quietbattles.mapper.ProductMapper;
import com.quietbattles.mapper.SeriesMapper;
import com.quietbattles.repository.ChapterRepository;
import com.quietbattles.repository.ProductRepository;
import com.quietbattles.repository.SeriesRepository;
import com.quietbattles.service.PublicContentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class PublicContentServiceImpl implements PublicContentService {

    private final SeriesRepository seriesRepository;
    private final ChapterRepository chapterRepository;
    private final ProductRepository productRepository;
    private final SeriesMapper seriesMapper;
    private final ChapterMapper chapterMapper;
    private final ProductMapper productMapper;

    public PublicContentServiceImpl(
            SeriesRepository seriesRepository,
            ChapterRepository chapterRepository,
            ProductRepository productRepository,
            SeriesMapper seriesMapper,
            ChapterMapper chapterMapper,
            ProductMapper productMapper) {
        this.seriesRepository = seriesRepository;
        this.chapterRepository = chapterRepository;
        this.productRepository = productRepository;
        this.seriesMapper = seriesMapper;
        this.chapterMapper = chapterMapper;
        this.productMapper = productMapper;
    }

    @Override
    public List<SeriesResponse> getPublicSeries() {
        return seriesRepository.findByStatus(ContentStatus.PUBLISHED).stream()
                .map(seriesMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public SeriesResponse getPublicSeriesBySlug(String slug) {
        Series series = seriesRepository.findBySlugAndStatus(slug, ContentStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Published Series", "slug", slug));
        return seriesMapper.toResponse(series);
    }

    @Override
    public List<ChapterResponse> getPublicChaptersBySeriesSlug(String seriesSlug) {
        // Verify that the Series itself exists and is PUBLISHED
        Series series = seriesRepository.findBySlugAndStatus(seriesSlug, ContentStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Published Series", "slug", seriesSlug));

        List<Chapter> chapters = chapterRepository.findBySeriesSlugAndStatusOrderByDisplayOrderAsc(
                series.getSlug(), ContentStatus.PUBLISHED
        );

        return chapters.stream()
                .map(chapterMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ChapterResponse getPublicChapter(String seriesSlug, String chapterSlug) {
        Chapter chapter = chapterRepository.findBySlugAndSeriesSlugAndStatus(
                chapterSlug, seriesSlug, ContentStatus.PUBLISHED
        ).orElseThrow(() -> new ResourceNotFoundException(String.format(
                "Published chapter '%s' not found within published series '%s'", chapterSlug, seriesSlug
        )));

        return chapterMapper.toResponse(chapter);
    }

    @Override
    public List<ProductResponse> getPublicProducts(String search) {
        List<Product> products;
        if (search != null && !search.trim().isEmpty()) {
            products = productRepository.findByNameContainingIgnoreCaseAndStatus(
                    search.trim(), ContentStatus.PUBLISHED
            );
        } else {
            products = productRepository.findByStatus(ContentStatus.PUBLISHED);
        }

        return products.stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse getPublicProductBySlug(String slug) {
        Product product = productRepository.findBySlugAndStatus(slug, ContentStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Published Product", "slug", slug));
        return productMapper.toResponse(product);
    }
}


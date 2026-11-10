package com.quietbattles.repository;

import com.quietbattles.entity.Chapter;
import com.quietbattles.enums.ContentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    Optional<Chapter> findBySlug(String slug);

    @Query("SELECT c FROM Chapter c WHERE c.slug = :chapterSlug AND c.series.slug = :seriesSlug")
    Optional<Chapter> findBySlugAndSeriesSlug(
            @Param("chapterSlug") String chapterSlug,
            @Param("seriesSlug") String seriesSlug
    );

    @Query("SELECT c FROM Chapter c WHERE c.slug = :chapterSlug AND c.series.slug = :seriesSlug AND c.status = :status")
    Optional<Chapter> findBySlugAndSeriesSlugAndStatus(
            @Param("chapterSlug") String chapterSlug,
            @Param("seriesSlug") String seriesSlug,
            @Param("status") ContentStatus status
    );

    @Query("SELECT c FROM Chapter c WHERE c.series.slug = :seriesSlug AND c.status = :status ORDER BY c.displayOrder ASC, c.chapterNumber ASC")
    List<Chapter> findBySeriesSlugAndStatusOrderByDisplayOrderAsc(
            @Param("seriesSlug") String seriesSlug,
            @Param("status") ContentStatus status
    );

    List<Chapter> findBySeriesId(Long seriesId);

    List<Chapter> findBySeriesIdOrderByDisplayOrderAscChapterNumberAsc(Long seriesId);

    List<Chapter> findBySeriesIdAndStatus(Long seriesId, ContentStatus status);

    Optional<Chapter> findBySeriesIdAndChapterNumber(Long seriesId, Integer chapterNumber);

    boolean existsBySeriesIdAndChapterNumber(Long seriesId, Integer chapterNumber);

    boolean existsBySlug(String slug);

    long countBySeriesId(Long seriesId);

    long countByProductId(Long productId);
}

package com.quietbattles.repository;

import com.quietbattles.entity.Chapter;
import com.quietbattles.enums.ContentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    Optional<Chapter> findBySlug(String slug);

    List<Chapter> findBySeriesIdOrderByDisplayOrderAscChapterNumberAsc(Long seriesId);

    Optional<Chapter> findBySeriesIdAndChapterNumber(Long seriesId, Integer chapterNumber);

    List<Chapter> findByStatus(ContentStatus status);

    boolean existsBySeriesIdAndChapterNumber(Long seriesId, Integer chapterNumber);
}


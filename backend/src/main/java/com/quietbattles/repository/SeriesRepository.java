package com.quietbattles.repository;

import com.quietbattles.entity.Series;
import com.quietbattles.enums.ContentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SeriesRepository extends JpaRepository<Series, Long> {

    Optional<Series> findBySlug(String slug);

    Optional<Series> findBySlugAndStatus(String slug, ContentStatus status);

    boolean existsBySlug(String slug);

    List<Series> findByStatus(ContentStatus status);
}

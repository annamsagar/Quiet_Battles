package com.quietbattles.repository;

import com.quietbattles.entity.Product;
import com.quietbattles.enums.ContentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySlug(String slug);

    Optional<Product> findBySlugAndStatus(String slug, ContentStatus status);

    boolean existsBySlug(String slug);

    List<Product> findBySeriesId(Long seriesId);

    List<Product> findByStatus(ContentStatus status);

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByNameContainingIgnoreCaseAndStatus(String name, ContentStatus status);

    long countBySeriesId(Long seriesId);
}

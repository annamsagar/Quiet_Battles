package com.quietbattles.controller;

import com.quietbattles.dto.request.SeriesRequest;
import com.quietbattles.dto.response.SeriesResponse;
import com.quietbattles.service.SeriesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/series")
@Tag(name = "Series Management", description = "Endpoints for administering QUIET BATTLES™ fashion collections and series")
public class SeriesController {

    private final SeriesService seriesService;

    public SeriesController(SeriesService seriesService) {
        this.seriesService = seriesService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create Series", description = "Creates a new editorial series collection")
    public ResponseEntity<SeriesResponse> createSeries(@Valid @RequestBody SeriesRequest request) {
        SeriesResponse response = seriesService.createSeries(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get All Series", description = "Retrieves all series collections regardless of publication status")
    public ResponseEntity<List<SeriesResponse>> getAllSeries() {
        return ResponseEntity.ok(seriesService.getAllSeries());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Series by ID", description = "Retrieves a specific series collection by its numerical ID")
    public ResponseEntity<SeriesResponse> getSeriesById(
            @Parameter(description = "Primary key ID of the series") @PathVariable Long id) {
        return ResponseEntity.ok(seriesService.getSeriesById(id));
    }

    @GetMapping("/slug/{slug}")
    @Operation(summary = "Get Series by Slug", description = "Retrieves a specific series collection by its unique slug")
    public ResponseEntity<SeriesResponse> getSeriesBySlug(
            @Parameter(description = "Unique URL slug of the series (e.g. series-01)") @PathVariable String slug) {
        return ResponseEntity.ok(seriesService.getSeriesBySlug(slug));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Series", description = "Updates an existing series collection by ID")
    public ResponseEntity<SeriesResponse> updateSeries(
            @Parameter(description = "Primary key ID of the series") @PathVariable Long id,
            @Valid @RequestBody SeriesRequest request) {
        return ResponseEntity.ok(seriesService.updateSeries(id, request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete Series", description = "Deletes a series collection if no chapters or products reference it")
    public ResponseEntity<Void> deleteSeries(
            @Parameter(description = "Primary key ID of the series") @PathVariable Long id) {
        seriesService.deleteSeries(id);
        return ResponseEntity.noContent().build();
    }
}


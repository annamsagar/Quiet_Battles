package com.quietbattles.service;

import com.quietbattles.dto.request.SeriesRequest;
import com.quietbattles.dto.response.SeriesResponse;

import java.util.List;

public interface SeriesService {

    SeriesResponse createSeries(SeriesRequest request);

    SeriesResponse updateSeries(Long id, SeriesRequest request);

    SeriesResponse getSeriesById(Long id);

    SeriesResponse getSeriesBySlug(String slug);

    List<SeriesResponse> getAllSeries();

    void deleteSeries(Long id);
}


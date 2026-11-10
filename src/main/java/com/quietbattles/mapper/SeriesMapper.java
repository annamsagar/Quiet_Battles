package com.quietbattles.mapper;

import com.quietbattles.dto.request.SeriesRequest;
import com.quietbattles.dto.response.SeriesResponse;
import com.quietbattles.entity.Series;
import com.quietbattles.enums.ContentStatus;
import org.springframework.stereotype.Component;

@Component
public class SeriesMapper {

    public SeriesResponse toResponse(Series series) {
        if (series == null) {
            return null;
        }

        return new SeriesResponse(
                series.getId(),
                series.getTitle(),
                series.getSlug(),
                series.getDescription(),
                series.getCoverImageUrl(),
                series.getStatus(),
                series.getCreatedAt(),
                series.getUpdatedAt()
        );
    }

    public Series toEntity(SeriesRequest request) {
        if (request == null) {
            return null;
        }

        Series series = new Series();
        series.setTitle(request.getTitle());
        series.setSlug(request.getSlug());
        series.setDescription(request.getDescription());
        series.setCoverImageUrl(request.getCoverImageUrl());
        series.setStatus(request.getStatus() != null ? request.getStatus() : ContentStatus.DRAFT);
        return series;
    }

    public void updateEntity(Series series, SeriesRequest request) {
        if (series == null || request == null) {
            return;
        }

        series.setTitle(request.getTitle());
        series.setSlug(request.getSlug());
        series.setDescription(request.getDescription());
        series.setCoverImageUrl(request.getCoverImageUrl());
        if (request.getStatus() != null) {
            series.setStatus(request.getStatus());
        }
    }
}


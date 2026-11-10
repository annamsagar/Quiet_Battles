package com.quietbattles.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.quietbattles.dto.request.ChapterRequest;
import com.quietbattles.dto.request.ProductImageRequest;
import com.quietbattles.dto.request.ProductRequest;
import com.quietbattles.dto.request.SeriesRequest;
import com.quietbattles.dto.response.ChapterResponse;
import com.quietbattles.dto.response.ProductResponse;
import com.quietbattles.dto.response.SeriesResponse;
import com.quietbattles.enums.ContentStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Set;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@WithMockUser(username = "admin@quietbattles.demo", roles = {"ADMIN"})
class RestApiControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("End-to-End REST Flow: Series, Products, Images, Chapters & Public Storefront APIs")
    void testFullRestApiWorkflow() throws Exception {
        // 1. Create Series via POST /api/v1/series
        SeriesRequest seriesReq = new SeriesRequest(
                "THE GENTLE ARMOR",
                "the-gentle-armor",
                "An exploration of resilience, softness and strength.",
                "https://images.unsplash.com/photo-1509631179647-0177331693ae",
                ContentStatus.PUBLISHED
        );

        MvcResult seriesResult = mockMvc.perform(post("/api/v1/series")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(seriesReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.slug").value("the-gentle-armor"))
                .andExpect(jsonPath("$.status").value("PUBLISHED"))
                .andReturn();

        SeriesResponse createdSeries = objectMapper.readValue(
                seriesResult.getResponse().getContentAsString(), SeriesResponse.class);
        Long seriesId = createdSeries.getId();

        // 2. Create Product via POST /api/v1/products
        ProductRequest productReq = new ProductRequest(
                "REST ARCHITECTURAL SILHOUETTE TEE",
                "rest-architectural-tee",
                "Heavyweight organic luxury cotton with raw-edge architectural seams.",
                new BigDecimal("1499.00"),
                "Tees",
                25,
                Set.of("S", "M", "L", "XL", "XXL"),
                ContentStatus.PUBLISHED,
                seriesId
        );

        MvcResult productResult = mockMvc.perform(post("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.slug").value("rest-architectural-tee"))
                .andExpect(jsonPath("$.price").value(1499.00))
                .andExpect(jsonPath("$.availableSizes", hasItems("S", "M", "L", "XL", "XXL")))
                .andReturn();

        ProductResponse createdProduct = objectMapper.readValue(
                productResult.getResponse().getContentAsString(), ProductResponse.class);
        Long productId = createdProduct.getId();

        // 3. Add Image via POST /api/v1/products/{productId}/images
        ProductImageRequest imageReq = new ProductImageRequest(
                "https://images.unsplash.com/photo-1544441893-675973e31985",
                "Front lookbook editorial of oversized tee",
                1
        );

        MvcResult imageResult = mockMvc.perform(post("/api/v1/products/{productId}/images", productId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(imageReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.productId").value(productId))
                .andExpect(jsonPath("$.imageUrl").value("https://images.unsplash.com/photo-1544441893-675973e31985"))
                .andReturn();

        // 3a. Invalid Image URL validation test (reject file:// and non-http URLs)
        ProductImageRequest invalidUrlReq = new ProductImageRequest(
                "file:///etc/passwd",
                "Malicious local file path",
                1
        );
        mockMvc.perform(post("/api/v1/products/{productId}/images", productId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidUrlReq)))
                .andExpect(status().isBadRequest());

        // 4. Create Chapter 1 via POST /api/v1/chapters
        ChapterRequest chapter1Req = new ChapterRequest(
                "THE SILENCE",
                "test-the-silence-chapter",
                1,
                "Introspection",
                "Before the armor is worn, there is stillness.",
                "In the quiet space between thoughts, identity takes form.",
                "Editorial narrative story for The Silence.",
                "https://images.unsplash.com/photo-1509631179647-0177331693ae",
                null,
                1,
                ContentStatus.PUBLISHED,
                seriesId,
                productId
        );

        mockMvc.perform(post("/api/v1/chapters")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(chapter1Req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.slug").value("test-the-silence-chapter"))
                .andExpect(jsonPath("$.seriesTitle").value("THE GENTLE ARMOR"))
                .andExpect(jsonPath("$.productId").value(productId));

        // 5. Test Public APIs (Storefront)
        // 5a. GET /api/v1/public/series
        mockMvc.perform(get("/api/v1/public/series"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[*].slug", hasItem("the-gentle-armor")));

        // 5b. GET /api/v1/public/series/{slug}
        mockMvc.perform(get("/api/v1/public/series/{slug}", "the-gentle-armor"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("THE GENTLE ARMOR"));

        // 5c. GET /api/v1/public/series/{slug}/chapters
        mockMvc.perform(get("/api/v1/public/series/{slug}/chapters", "the-gentle-armor"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title").value("THE SILENCE"));

        // 5d. GET /api/v1/public/chapters/{seriesSlug}/{chapterSlug}
        mockMvc.perform(get("/api/v1/public/chapters/{seriesSlug}/{chapterSlug}", "the-gentle-armor", "test-the-silence-chapter"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("THE SILENCE"))
                .andExpect(jsonPath("$.productId").value(productId));

        // 5e. GET /api/v1/public/products with search
        mockMvc.perform(get("/api/v1/public/products")
                        .param("search", "Architectural"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].name").value("REST ARCHITECTURAL SILHOUETTE TEE"))
                .andExpect(jsonPath("$[0].images", hasSize(1)));

        // 5f. GET /api/v1/public/products/{slug}
        mockMvc.perform(get("/api/v1/public/products/{slug}", "rest-architectural-tee"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.slug").value("rest-architectural-tee"))
                .andExpect(jsonPath("$.availableSizes", hasItems("S", "M", "L", "XL", "XXL")));

        // 6. Test DRAFT Exclusion from Public Endpoints
        SeriesRequest draftSeriesReq = new SeriesRequest(
                "DRAFT SERIES",
                "draft-series",
                "Unpublished collection.",
                null,
                ContentStatus.DRAFT
        );
        mockMvc.perform(post("/api/v1/series")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(draftSeriesReq)))
                .andExpect(status().isCreated());

        // Attempting to access DRAFT via public endpoint returns 404
        mockMvc.perform(get("/api/v1/public/series/{slug}", "draft-series"))
                .andExpect(status().isNotFound());
    }
}


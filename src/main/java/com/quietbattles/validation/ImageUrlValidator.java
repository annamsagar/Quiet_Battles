package com.quietbattles.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.net.URI;

public class ImageUrlValidator implements ConstraintValidator<ValidImageUrl, String> {

    private boolean required;

    @Override
    public void initialize(ValidImageUrl constraintAnnotation) {
        this.required = constraintAnnotation.required();
    }

    @Override
    public boolean isValid(String url, ConstraintValidatorContext context) {
        if (url == null || url.trim().isEmpty()) {
            return !required;
        }

        String trimmed = url.trim();

        if (trimmed.length() > 500) {
            return false;
        }

        // Strictly enforce HTTP or HTTPS scheme - reject file://, C:\, /etc, data:, ftp:, etc.
        if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
            return false;
        }

        try {
            URI uri = URI.create(trimmed);
            String scheme = uri.getScheme();
            if (scheme == null || (!scheme.equalsIgnoreCase("http") && !scheme.equalsIgnoreCase("https"))) {
                return false;
            }
            if (uri.getHost() == null || uri.getHost().trim().isEmpty()) {
                return false;
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}


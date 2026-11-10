package com.quietbattles.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Validation annotation for publicly accessible image URLs.
 * Requires absolute HTTP or HTTPS schemes, max 500 characters,
 * and rejects local filesystem paths or unsupported schemes.
 */
@Documented
@Constraint(validatedBy = ImageUrlValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidImageUrl {

    String message() default "Invalid image URL. Must be an absolute HTTP or HTTPS URL under 500 characters.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    boolean required() default false;
}


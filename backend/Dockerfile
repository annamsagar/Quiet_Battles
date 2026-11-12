# ==============================================================================
# QUIET BATTLES™ BACKEND – DOCKERFILE
# Multi-stage production build using Eclipse Temurin JDK 21 Alpine
# ==============================================================================

# STAGE 1: Build Application
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /workspace

# Copy Maven wrapper and POM
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x ./mvnw

# Copy source code and package application
COPY src ./src
RUN ./mvnw clean package -DskipTests -B

# STAGE 2: Lightweight Runtime Image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create unprivileged system user for secure container execution
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser:appgroup

# Copy built JAR artifact from builder stage
COPY --from=builder /workspace/target/*.jar /app/app.jar

# Configuration environment defaults
ENV SERVER_PORT=8081
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8081

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/app.jar"]


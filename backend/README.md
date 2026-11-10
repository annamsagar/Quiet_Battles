# QUIET BATTLES™ – Spring Boot REST API Backend

> **Brand**: QUIET BATTLES™  
> **Tagline**: *"WEAR YOUR BATTLES."*  
> **Architectural Paradigm**: Monolithic Layered REST API Service  
> **Stack**: Java 21, Spring Boot 3.2.5, Spring Data JPA, PostgreSQL (Neon Cloud DB), Spring Security, Jakarta Validation, Springdoc OpenAPI / Swagger  

---

## 🏛️ 1. Project Overview

The **QUIET BATTLES™ Backend** is the enterprise service layer engineered to power the international luxury streetwear storefront and Content Management System. It transitions the application from client-side `LocalStorage` persistence to a robust, transactional, multi-tier Java backend backed by **PostgreSQL** (hosted on Neon Serverless Cloud).

### Key Architectural Capabilities
- **Monolithic Layered Design**: Clean division of concerns across `controller`, `service`, `repository`, `entity`, `dto`, `security`, and `config`.
- **CORS Management**: Pre-configured for local React + Vite development (`http://localhost:5173` and `http://localhost:3000`).
- **Spring Security Foundation**: Stateless session management, CSRF disabled for APIs, public health and Swagger endpoints, with hooks prepared for Phase 3 JWT authentication.
- **Global Error Handling**: Centralized `@RestControllerAdvice` delivering consistent, sanitized `ApiErrorResponse` payloads without stack trace leakage.
- **Interactive OpenAPI Documentation**: Swagger UI pre-configured at `http://localhost:8081/swagger-ui/index.html`.
- **JPA & Hibernate ORM**: Clean domain models with audit timestamps, lifecycle hooks (`@PrePersist`, `@PreUpdate`), precise financial arithmetic (`BigDecimal(10,2)`), and text fields for editorial narratives.

---

## 💻 2. Technology Stack

| Layer | Technology | Version / Notes |
| :--- | :--- | :--- |
| **Language** | Java | 21 (LTS) / compatible with Java 17+ |
| **Framework** | Spring Boot | 3.2.5 |
| **Build Tool** | Apache Maven | 3.9+ (includes self-contained `mvnw` wrapper) |
| **Web Layer** | Spring Web (MVC) | RESTful controllers returning JSON |
| **Persistence** | Spring Data JPA / Hibernate | 6.4.4 ORM with HikariCP connection pooling |
| **Database** | PostgreSQL | Neon Serverless Cloud (AWS us-east-2) |
| **Security** | Spring Security | 6.2.4 (Stateless, prepared for JWT) |
| **Validation** | Jakarta Bean Validation | Hibernate Validator (`@NotNull`, `@Size`, `@Min`, `@NotBlank`) |
| **Documentation** | Springdoc OpenAPI / Swagger UI | 2.5.0 (`/swagger-ui/index.html`) |

---

## 📂 3. Package Structure

```
backend/
├── .mvn/wrapper/                    # Self-contained Maven wrapper binaries
├── src/
│   ├── main/
│   │   ├── java/com/quietbattles/
│   │   │   ├── config/              # Infrastructure beans (CorsConfig, OpenApiConfig)
│   │   │   ├── controller/          # REST controllers (HealthController)
│   │   │   ├── dto/                 # Request & response data transfer objects (HealthResponse)
│   │   │   ├── entity/              # JPA domain entities (Phase 2)
│   │   │   │   ├── Chapter.java
│   │   │   │   ├── Product.java
│   │   │   │   ├── ProductImage.java
│   │   │   │   ├── Series.java
│   │   │   │   └── User.java
│   │   │   ├── enums/               # Domain enumerations (Phase 2)
│   │   │   │   ├── ContentStatus.java
│   │   │   │   └── UserRole.java
│   │   │   ├── exception/           # Global exception handling (GlobalExceptionHandler, ApiErrorResponse)
│   │   │   ├── mapper/              # Entity <-> DTO converters
│   │   │   ├── repository/          # Spring Data JPA repositories (Phase 2)
│   │   │   │   ├── ChapterRepository.java
│   │   │   │   ├── ProductImageRepository.java
│   │   │   │   ├── ProductRepository.java
│   │   │   │   ├── SeriesRepository.java
│   │   │   │   └── UserRepository.java
│   │   │   ├── security/            # SecurityFilterChain & PasswordEncoder (SecurityConfig)
│   │   │   ├── service/             # Business logic interfaces & services
│   │   │   └── QuietBattlesApplication.java # Spring Boot entrypoint
│   │   └── resources/
│   │       └── application.properties # Server port, PostgreSQL & Swagger configuration
│   └── test/
│       ├── java/com/quietbattles/   # Unit and integration tests
│       │   ├── controller/
│       │   │   └── HealthControllerTest.java
│       │   ├── entity/
│       │   │   └── EntityMappingIntegrationTest.java
│       │   └── QuietBattlesApplicationTests.java
│       └── resources/
│           └── application-test.properties
├── .env.example                     # Environment variables template
├── .gitignore                       # Standard Java / Maven / IDE ignores
├── mvnw & mvnw.cmd                  # Cross-platform Maven wrapper scripts
├── pom.xml                          # Maven build descriptors & dependencies
└── README.md                        # Documentation
```

---

## 🗄️ 4. Database Schema & JPA Entity Mappings (Phase 2)

### Table Specifications

| Entity | PostgreSQL Table | Primary Key | Key Fields & Constraints | Relationships |
| :--- | :--- | :--- | :--- | :--- |
| **`User`** | `users` | `id` (BIGSERIAL) | `username` (UK, NOT NULL), `email` (UK, NOT NULL), `password`, `role` (ADMIN), `enabled` | Self-contained administrative entity |
| **`Series`** | `series` | `id` (BIGSERIAL) | `title`, `slug` (UK, NOT NULL), `description` (TEXT), `cover_image_url`, `status` (DRAFT, PUBLISHED) | 1:M `chapters`, 1:M `products` |
| **`Product`** | `products` | `id` (BIGSERIAL) | `name`, `slug` (UK, NOT NULL), `description` (TEXT), `price` (NUMERIC 10,2), `category`, `stock_quantity`, `status` | M:1 `series`, 1:M `images`, 1:M `chapters`, 1:M `product_sizes` |
| **`ProductImage`** | `product_images` | `id` (BIGSERIAL) | `image_url` (NOT NULL), `alt_text`, `display_order`, `created_at` | M:1 `product` (FK NOT NULL) |
| **`Chapter`** | `chapters` | `id` (BIGSERIAL) | `title`, `slug`, `chapter_number` (NOT NULL, >=1), `theme`, `short_description`, `opening_quote`, `story_content` (TEXT), `cover_image_url`, `secondary_image_url`, `display_order`, `status` | M:1 `series` (FK NOT NULL), M:1 `product` (FK Optional), UK `(series_id, chapter_number)` |
| **`ProductSize`** | `product_sizes` | `(product_id, size)` | `size` (VARCHAR 10) | `@ElementCollection` table linked to `products` |

### Architectural Design Decisions
1. **PostgreSQL Compatibility**: Descriptions and editorial narrative content are mapped via `@Column(columnDefinition = "TEXT")` rather than `@Lob` to prevent PostgreSQL from treating strings as Large Object references (OIDs).
2. **Financial Precision**: Garment pricing uses `BigDecimal` with `@Column(precision = 10, scale = 2)` to eliminate floating-point rounding inaccuracies.
3. **Circular Reference Prevention**: Avoided Lombok `@Data` on entity models containing bidirectional relationships to avoid recursive `hashCode()`, `equals()`, and `toString()` stack overflows.
4. **Data Integrity Constraints**: Unique constraint `uk_series_chapter_number` prevents duplicate chapter ordering within any series.
5. **Auditing**: All entities automatically maintain `createdAt` and `updatedAt` via `@PrePersist` and `@PreUpdate` lifecycle callbacks.

---

## 🚀 5. Execution Commands

### Clean & Compile
```powershell
cd backend
.\mvnw.cmd clean compile
```

### Run Tests (including Entity Mapping Integration Test)
```powershell
cd backend
.\mvnw.cmd test
```

### Package Application JAR
```powershell
cd backend
.\mvnw.cmd package -DskipTests
```

### Run Spring Boot Application
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The server starts at: [`http://localhost:8081`](http://localhost:8081)

---

## 🔍 6. Verification Endpoints

### 1. Health Check Endpoint
- **URL**: [`http://localhost:8081/api/v1/health`](http://localhost:8081/api/v1/health)
- **Method**: `GET`
- **Response** (`200 OK`):
```json
{
  "status": "UP",
  "application": "QUIET BATTLES BACKEND",
  "message": "Backend is running successfully"
}
```

### 2. Swagger UI Documentation
- **URL**: [`http://localhost:8081/swagger-ui/index.html`](http://localhost:8081/swagger-ui/index.html)

### 3. OpenAPI Raw JSON Specification
- **URL**: [`http://localhost:8081/v3/api-docs`](http://localhost:8081/v3/api-docs)

---

## 🛡️ 7. Development Roadmap

- [x] **Phase 1**: Monolithic Layered Architecture, Spring Security baseline, CORS, Health Check, Swagger UI.
- [x] **Phase 2**: Database Schema Design, JPA Entities (`User`, `Series`, `Chapter`, `Product`, `ProductImage`), Enums (`ContentStatus`, `UserRole`), Spring Data JPA Repositories, Neon DB Serverless PostgreSQL Schema generation and verification tests.
- [ ] **Phase 3**: Spring Security JWT Authentication, Admin User Role, Login/Refresh Tokens, and Protected CMS Endpoints.
- [ ] **Phase 4**: Spring Data JPA REST Services & Controllers for Series, Chapters, and Products CRUD.
- [ ] **Phase 5**: Cloudinary Image Storage Integration and React Frontend API Client Connection.

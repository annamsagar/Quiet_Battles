# QUIET BATTLES™ – Spring Boot REST API Backend

> **Brand**: QUIET BATTLES™  
> **Tagline**: *"WEAR YOUR BATTLES."*  
> **Architectural Paradigm**: Monolithic Layered REST API Service  
> **Stack**: Java 21, Spring Boot 3.2.5, Spring Security 6, JJWT 0.12.5, Spring Data JPA, PostgreSQL (Neon Cloud DB), Jakarta Validation, Springdoc OpenAPI / Swagger  

---

## 🏛️ 1. Project Overview

The **QUIET BATTLES™ Backend** is the enterprise service layer engineered to power the international luxury streetwear storefront and Content Management System. It transitions the application from client-side `LocalStorage` persistence to a robust, transactional, multi-tier Java backend backed by **PostgreSQL** (hosted on Neon Serverless Cloud) secured with **Spring Security 6 & JWT authentication**.

### Key Architectural Capabilities
- **Monolithic Layered Design**: Clean division of concerns across `controller`, `service`, `repository`, `entity`, `dto`, `security`, and `config`.
- **Spring Security 6 & JWT Auth**: Stateless token filter chain, BCrypt password hashing, role-based authorization (`ROLE_ADMIN`), and auto-seeded admin account.
- **RESTful Content APIs**: Full CRUD operations for Series, Chapters, Products, and Product Images.
- **Image URL Management (Phase 6)**: Standardized HTTP/HTTPS image URL management without heavyweight external upload dependencies. Validated via custom `@ValidImageUrl` annotation with strict product ownership scoping.
- **Storefront Public Content APIs**: Dedicated endpoints serving only `PUBLISHED` content, sorting chapters in narrative sequence and supporting product search.
- **Interactive OpenAPI Documentation**: Swagger UI pre-configured at `http://localhost:8081/swagger-ui/index.html` with BearerAuth JWT integration.

---

## 💻 2. Technology Stack

| Layer | Technology | Version / Notes |
| :--- | :--- | :--- |
| **Language** | Java | 21 (LTS) / compatible with Java 17+ |
| **Framework** | Spring Boot | 3.2.5 |
| **Build Tool** | Apache Maven | 3.9+ (includes self-contained `mvnw` wrapper) |
| **Security & Auth** | Spring Security 6 & JJWT | 6.2.4 & JJWT 0.12.5 (HMAC-SHA256) |
| **Persistence** | Spring Data JPA / Hibernate | 6.4.4 ORM with HikariCP connection pooling |
| **Database** | PostgreSQL | Neon Serverless Cloud (AWS us-east-2) |
| **Validation** | Jakarta Bean Validation | Hibernate Validator (`@NotNull`, `@Size`, `@Min`, `@NotBlank`, `@DecimalMin`, `@ValidImageUrl`) |
| **Documentation** | Springdoc OpenAPI / Swagger UI | 2.5.0 (`/swagger-ui/index.html`) |

---

## 🔐 3. Authentication & Security

### Public Endpoints (No Authentication Required)
- `GET /api/v1/health`
- `POST /api/v1/auth/login`
- `GET /api/v1/public/**` (all public consumer storefront endpoints)
- `/swagger-ui/**`, `/v3/api-docs/**`
- `OPTIONS /**` (pre-flight CORS)

### Protected Administrative Endpoints (Requires `Authorization: Bearer <token>`)
- `GET /api/v1/auth/me`
- All write operations: `POST`, `PUT`, `DELETE` on `/api/v1/series/**`, `/api/v1/chapters/**`, `/api/v1/products/**`
- Admin catalog lookups: `/api/v1/series`, `/api/v1/chapters`, `/api/v1/products`

### Default Development Admin Credentials
- **Email**: `admin@quietbattles.demo`
- **Password**: `QuietBattles@2026`
- **Role**: `ADMIN`

Configurable via environment variables:
```bash
ADMIN_EMAIL=admin@quietbattles.demo
ADMIN_USERNAME=admin
ADMIN_PASSWORD=QuietBattles@2026
JWT_SECRET=quietbattles_super_secret_jwt_key_2026_luxury_brand_security_minimum_256_bits_for_hmac_sha256
JWT_EXPIRATION=86400000
```

---

## 🖼️ 4. Image URL Management (Phase 6)

In alignment with MVP technical parameters, image assets are stored and managed via publicly accessible **HTTP/HTTPS image URLs** rather than requiring external cloud bucket uploads (such as AWS S3 or Cloudinary).

### Validation Safeguards (`@ValidImageUrl`)
- Requires absolute `http://` or `https://` protocols.
- Strictly rejects file paths (`file://`, `C:\`, `/etc`), data URIs (`data:`), and scripts.
- Enforces maximum length constraint (500 characters).
- Enforces product ownership verification: prevents updating or deleting an image asset using an unrelated product ID.

### Example Request (`POST /api/v1/products/{productId}/images`)
```json
{
  "imageUrl": "https://images.unsplash.com/photo-1544441893-675973e31985",
  "altText": "THE GENTLE ARMOR oversized tee front view",
  "displayOrder": 1
}
```

### Example Response (`201 Created`)
```json
{
  "id": 1,
  "productId": 2,
  "imageUrl": "https://images.unsplash.com/photo-1544441893-675973e31985",
  "altText": "THE GENTLE ARMOR oversized tee front view",
  "displayOrder": 1,
  "createdAt": "2026-11-10T22:20:00"
}
```

---

## 📡 5. Complete API Endpoint Matrix

### A. Authentication
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Public | Authenticates admin and returns JWT Bearer token |
| `GET` | `/api/v1/auth/me` | Admin | Returns current authenticated administrator profile |

### B. Public Consumer Storefront
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/public/series` | Public | List all PUBLISHED series collections |
| `GET` | `/api/v1/public/series/{slug}` | Public | Get single PUBLISHED series by slug |
| `GET` | `/api/v1/public/series/{slug}/chapters` | Public | List PUBLISHED chapters in narrative order |
| `GET` | `/api/v1/public/chapters/{seriesSlug}/{chapterSlug}` | Public | Get single PUBLISHED chapter with linked garment |
| `GET` | `/api/v1/public/products` | Public | List PUBLISHED products (optional `?search=`) |
| `GET` | `/api/v1/public/products/{slug}` | Public | Get PUBLISHED product by slug with images & sizes |

### C. Admin Content Management
| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/series` | Admin | Create series |
| `GET` | `/api/v1/series` | Admin | Get all series (draft & published) |
| `GET` | `/api/v1/series/{id}` | Admin | Get series by ID |
| `GET` | `/api/v1/series/slug/{slug}` | Admin | Get series by slug |
| `PUT` | `/api/v1/series/{id}` | Admin | Update series |
| `DELETE` | `/api/v1/series/{id}` | Admin | Delete series (protected by cascade rule) |
| `POST` | `/api/v1/chapters` | Admin | Create chapter |
| `GET` | `/api/v1/chapters` | Admin | Get all chapters |
| `GET` | `/api/v1/chapters/{id}` | Admin | Get chapter by ID |
| `GET` | `/api/v1/chapters/series/{seriesId}` | Admin | Get chapters by series |
| `PUT` | `/api/v1/chapters/{id}` | Admin | Update chapter |
| `DELETE` | `/api/v1/chapters/{id}` | Admin | Delete chapter |
| `POST` | `/api/v1/products` | Admin | Create product |
| `GET` | `/api/v1/products` | Admin | Get all products (optional `?search=`) |
| `GET` | `/api/v1/products/{id}` | Admin | Get product by ID |
| `GET` | `/api/v1/products/series/{seriesId}` | Admin | Get products by series |
| `PUT` | `/api/v1/products/{id}` | Admin | Update product |
| `DELETE` | `/api/v1/products/{id}` | Admin | Delete product |
| `POST` | `/api/v1/products/{productId}/images` | Admin | Add image URL to product |
| `GET` | `/api/v1/products/{productId}/images` | Admin | Get image gallery for product |
| `PUT` | `/api/v1/products/{productId}/images/{imageId}` | Admin | Update image asset metadata |
| `DELETE` | `/api/v1/products/{productId}/images/{imageId}` | Admin | Delete image asset |

---

## 🚀 6. Execution Commands

### Clean, Compile & Test
```powershell
cd backend
.\mvnw.cmd clean test
```

### Run Spring Boot Application
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The server starts at: [`http://localhost:8081`](http://localhost:8081)

---

## 🔍 7. Verification Endpoints

1. **Health Check**: [`http://localhost:8081/api/v1/health`](http://localhost:8081/api/v1/health)
2. **Swagger UI**: [`http://localhost:8081/swagger-ui/index.html`](http://localhost:8081/swagger-ui/index.html)
3. **OpenAPI JSON**: [`http://localhost:8081/v3/api-docs`](http://localhost:8081/v3/api-docs)

---

## 🛡️ 8. Development Roadmap
- [x] **Phase 1**: Monolithic Layered Architecture, Spring Security baseline, CORS, Health Check, Swagger UI.
- [x] **Phase 2**: Database Schema Design, JPA Entities (`User`, `Series`, `Chapter`, `Product`, `ProductImage`), Enums (`ContentStatus`, `UserRole`), Spring Data JPA Repositories, Neon DB Serverless PostgreSQL Schema generation and verification tests.
- [x] **Phase 3**: Spring Data JPA Repositories, DTOs, Service interfaces & implementations, Entity-DTO Mappers, Business validation rules, Global exception handling.
- [x] **Phase 4**: REST Controllers (`SeriesController`, `ChapterController`, `ProductController`, `ProductImageController`, `PublicContentController`).
- [x] **Phase 5**: Spring Security 6 & JWT Authentication, `JwtService`, `JwtAuthenticationFilter`, `CustomUserDetailsService`, `AuthController`, `AdminUserSeeder`, Role-based access control (`ADMIN`).
- [x] **Phase 6**: Image URL Management (without Cloudinary), `@ValidImageUrl` validation, Product-scoped image updates & deletes, Public image DTO exposure.

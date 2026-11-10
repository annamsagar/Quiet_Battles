# QUIET BATTLES™ – Luxury Fashion Brand Full-Stack Application

> *"WEAR YOUR BATTLES."*  
> **QUIET BATTLES™** is an architectural luxury streetwear brand born from the tension between vulnerability and resilience. This production-ready full-stack application integrates an editorial digital storefront with a secure administrative Content Management System (CMS) and a high-performance RESTful API backend.

---

## 1. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CLIENT TIER – REACT 18 + VITE                         │
│  - Tailwind CSS Luxury Design System (#0A0A0A, #151515, #F5F1EA, #A88B65)   │
│  - React Router v6 (Public Storefront & Protected /admin/* Routes)          │
│  - Axios Client with Dynamic JWT Bearer Interceptors & Auto-Logout          │
│  - LocalStorage Caching & Optimistic State Synchronization                  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP / REST / JSON
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    BACKEND TIER – SPRING BOOT 3 (JAVA 21)                   │
│  - Spring Security 6 (Stateless JWT Filter & BCrypt Password Hashing)       │
│  - Layered Clean Architecture (Controller -> Service -> Repository -> JPA) │
│  - Custom Jakarta Image URL Validators & Scoped Image Ownership Enforcement │
│  - Springdoc OpenAPI 3.0 / Swagger UI Specification                         │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HikariCP SSL Connection Pool
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                 DATABASE TIER – MANAGED NEON POSTGRESQL                     │
│  - Serverless PostgreSQL on AWS us-east-2 (SSL require)                     │
│  - Tables: users, series, chapters, products, product_images, product_sizes │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### Frontend
- **Framework**: React 18 (Vite SPA)
- **Language**: JavaScript (Strictly zero TypeScript)
- **Styling**: Tailwind CSS with custom editorial typography (`Playfair Display`, `Inter`, `JetBrains Mono`)
- **Animation**: Framer Motion
- **HTTP Client**: Axios with automatic request interceptors
- **Icons**: Lucide React
- **Hosting**: Vercel (`vercel.json` SPA routing)

### Backend
- **Framework**: Spring Boot 3.2.5
- **JDK**: Java 21 (Eclipse Temurin)
- **Security**: Spring Security 6 + JJWT 0.12.5 (HMAC-SHA256)
- **Persistence**: Spring Data JPA + Hibernate 6 ORM
- **Database**: PostgreSQL (Neon Cloud Serverless)
- **API Docs**: Springdoc OpenAPI 3.0 / Swagger UI
- **Build Tool**: Apache Maven Wrapper (`./mvnw`)
- **Hosting**: Render (`render.yaml` + multi-stage `Dockerfile`)

---

## 3. Project Directory Structure

```
QUIET BATTLES/
├── backend/                               # Spring Boot 3 Maven Project
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/quietbattles/
│   │   │   │   ├── config/                # CorsConfig, AdminUserSeeder, OpenApiConfig
│   │   │   │   ├── controller/            # Series, Chapter, Product, Auth, Health, Public
│   │   │   │   ├── dto/                   # Request & Response DTOs
│   │   │   │   ├── entity/                # JPA Entities (User, Series, Chapter, Product, ProductImage)
│   │   │   │   ├── enums/                 # ContentStatus (PUBLISHED, DRAFT), UserRole (ADMIN)
│   │   │   │   ├── exception/             # GlobalExceptionHandler, Custom Exceptions
│   │   │   │   ├── mapper/                # Entity-to-DTO Mappers
│   │   │   │   ├── repository/            # Spring Data JPA Repositories
│   │   │   │   ├── security/              # JwtService, JwtAuthenticationFilter, SecurityConfig
│   │   │   │   ├── service/               # Service Interfaces & Implementations
│   │   │   │   └── validation/            # @ValidImageUrl Annotation & Validator
│   │   │   └── resources/
│   │   │       └── application.properties # Main Spring configuration
│   │   └── test/                          # Comprehensive JUnit 5 & MockMvc integration tests
│   ├── Dockerfile                         # Production multi-stage Alpine Docker image
│   ├── pom.xml                            # Maven dependencies & build plugins
│   └── .env.example                       # Backend environment template
├── frontend/                              # React + Vite Frontend Project
│   ├── src/
│   │   ├── components/                    # Common, Home, Archive, Product, Admin UI components
│   │   ├── context/                       # AdminContext (JWT), ContentContext (API Sync), CartContext
│   │   ├── data/                          # Fallback datasets (Series, Chapters, Products)
│   │   ├── hooks/                         # Custom React hooks (useDocumentTitle)
│   │   ├── pages/                         # Home, Archive, SeriesDetail, ChapterDetail, Shop (Collections), ProductDetail, Cart
│   │   │   └── admin/                     # AdminLogin, AdminDashboard, Series, Chapter, Product Management
│   │   ├── services/                      # api.js, authService, seriesService, chapterService, productService, productImageService
│   │   └── utils/                         # slugify, formatCurrency, constants
│   ├── vercel.json                        # Vercel SPA routing
│   ├── package.json
│   └── .env.example                       # Frontend environment template
├── render.yaml                            # Render Blueprint deployment specification
├── vercel.json                            # Root Vercel SPA deployment configuration
└── README.md
```

---

## 4. REST API Endpoint Reference

**Base URL**: `http://localhost:8081/api/v1`  
**Swagger UI**: `http://localhost:8081/swagger-ui/index.html`

### Public Storefront Endpoints (No Authentication Required)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Backend heartbeat check |
| `POST` | `/api/v1/auth/login` | Admin authentication (returns JWT token) |
| `GET` | `/api/v1/public/series` | Retrieve all `PUBLISHED` series |
| `GET` | `/api/v1/public/series/{slug}` | Retrieve series by slug with published status |
| `GET` | `/api/v1/public/series/{seriesSlug}/chapters` | Retrieve chapters within a series in order |
| `GET` | `/api/v1/public/chapters/{seriesSlug}/{chapterSlug}` | Retrieve individual editorial chapter narrative |
| `GET` | `/api/v1/public/products` | Retrieve published products (supports `?search=` filter) |
| `GET` | `/api/v1/public/products/{slug}` | Retrieve published product by slug with images & sizes |

### Protected Administrative Endpoints (Requires `Authorization: Bearer <token>` & `ADMIN` Role)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/auth/me` | Retrieve currently authenticated admin details |
| `GET` | `/api/v1/series` | Get all series (both `PUBLISHED` and `DRAFT`) |
| `POST` | `/api/v1/series` | Create a new series |
| `GET` | `/api/v1/series/{id}` | Get series by numeric ID |
| `GET` | `/api/v1/series/slug/{slug}` | Get series by slug |
| `PUT` | `/api/v1/series/{id}` | Update existing series |
| `DELETE`| `/api/v1/series/{id}` | Permanently delete series |
| `GET` | `/api/v1/chapters` | Get all chapters across all series |
| `POST` | `/api/v1/chapters` | Create a new narrative chapter |
| `GET` | `/api/v1/chapters/{id}` | Get chapter by ID |
| `GET` | `/api/v1/chapters/slug/{seriesSlug}/{chapterSlug}` | Get chapter by series and chapter slug |
| `GET` | `/api/v1/chapters/series/{seriesId}` | Get chapters in a series ordered by displayOrder |
| `PUT` | `/api/v1/chapters/{id}` | Update chapter |
| `DELETE`| `/api/v1/chapters/{id}` | Delete chapter |
| `GET` | `/api/v1/products` | Get all products with images and inventory |
| `POST` | `/api/v1/products` | Create a new luxury garment |
| `GET` | `/api/v1/products/{id}` | Get product by ID |
| `GET` | `/api/v1/products/slug/{slug}` | Get product by slug |
| `GET` | `/api/v1/products/series/{seriesId}` | Get products assigned to a series |
| `PUT` | `/api/v1/products/{id}` | Update product specifications and stock |
| `DELETE`| `/api/v1/products/{id}` | Delete product |
| `POST` | `/api/v1/products/{productId}/images` | Add image URL to product (validates HTTP/HTTPS) |
| `GET` | `/api/v1/products/{productId}/images` | Get all images for a product in display order |
| `PUT` | `/api/v1/products/{productId}/images/{imageId}` | Update image URL, alt text, or display order |
| `DELETE`| `/api/v1/products/{productId}/images/{imageId}` | Delete image belonging to product |

---

## 5. Security & Authentication

- **Algorithm**: HMAC-SHA256 with 256-bit cryptographic secret.
- **Token Validity**: 24 hours (`86,400,000` ms).
- **Password Encoding**: BCrypt (strength 12).
- **Session Policy**: Stateless (`SessionCreationPolicy.STATELESS`).

### Pre-Seeded Admin Credentials
At startup, `AdminUserSeeder` automatically verifies or creates the administrative account:
- **Email**: `admin@quietbattles.demo`
- **Password**: `QuietBattles@2026`
- **Role**: `ADMIN`

---

## 6. Local Development Setup

### Prerequisites
- Java 21 JDK installed (`java -version`)
- Node.js 18+ and npm (`node -v`)

### 1. Run the Backend
```powershell
cd backend
# Copy environment configuration
cp .env.example .env
# Run with Maven Wrapper (starts on http://localhost:8081)
./mvnw.cmd spring-boot:run
```

Verify backend health:
```bash
curl http://localhost:8081/api/v1/health
```

### 2. Run the Frontend
```powershell
cd frontend
# Install dependencies
npm install
# Start Vite development server (starts on http://localhost:3000)
npm run dev
```

Open `http://localhost:3000` in your browser.

### 3. Accessing the Admin CMS
Navigate to `http://localhost:3000/admin/login` and log in with:
- **Email**: `admin@quietbattles.demo`
- **Password**: `QuietBattles@2026`

---

## 7. Production Deployment Guide

### A. Deploy Backend to Render
1. Push this repository to GitHub.
2. In Render Dashboard, click **New +** -> **Blueprint**.
3. Connect your repository (`render.yaml` is automatically detected).
4. Configure environment variables in Render:
   - `DB_URL`: `jdbc:postgresql://<neon-host>:5432/neondb?sslmode=require`
   - `DB_USERNAME`: `<neon-username>`
   - `DB_PASSWORD`: `<neon-password>`
   - `JWT_SECRET`: `<secure-random-256-bit-string>`
   - `CORS_ALLOWED_ORIGINS`: `https://quiet-battles.vercel.app`
5. Click **Apply**. Render builds the multi-stage Docker container and starts the Spring Boot service.

### B. Deploy Frontend to Vercel
1. In Vercel Dashboard, click **Add New** -> **Project**.
2. Import the GitHub repository.
3. Configure the project settings:
   - **Root Directory**: `frontend` (or leave default if using root `vercel.json`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://quiet-battles-backend.onrender.com/api/v1`
5. Click **Deploy**. Vercel will build and deploy the SPA with client-side routing.

---

## 8. Quality Assurance & Testing

- **Backend Unit & Integration Tests**: Run `./mvnw test` inside `backend/`. Covers controllers, security, services, repositories, and image URL validation.
- **Frontend Production Build**: Run `npm run build` inside `frontend/` to generate optimized production assets.
- **Client Fallback Resilience**: If the backend is temporarily offline, the frontend falls back gracefully to local datasets so user browsing is never interrupted.

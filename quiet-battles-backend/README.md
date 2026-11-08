# QUIET BATTLES™ – Spring Boot REST API Backend

> **Brand**: QUIET BATTLES™  
> **Tagline**: *"WEAR YOUR BATTLES."*  
> **Architectural Paradigm**: Monolithic Layered REST API Service  
> **Stack**: Java 21, Spring Boot 3.2.5, Spring Data JPA, PostgreSQL, Spring Security, Jakarta Validation, Springdoc OpenAPI / Swagger  

---

## 🏛️ 1. Project Overview

The **QUIET BATTLES™ Backend** is the enterprise service layer engineered to power the international luxury streetwear storefront and Content Management System. It transitions the application from client-side `LocalStorage` persistence to a robust, transactional, multi-tier Java backend backed by **PostgreSQL**.

### Key Architectural Capabilities
- **Monolithic Layered Design**: Clean division of concerns across `controller`, `service`, `repository`, `entity`, `dto`, `security`, and `config`.
- **CORS Management**: Pre-configured for local React + Vite development (`http://localhost:5173` and `http://localhost:3000`).
- **Spring Security Foundation**: Stateless session management, CSRF disabled for APIs, public health and Swagger endpoints, with hooks prepared for Phase 3 JWT authentication.
- **Global Error Handling**: Centralized `@RestControllerAdvice` delivering consistent, sanitized `ApiErrorResponse` payloads without stack trace leakage.
- **Interactive OpenAPI Documentation**: Swagger UI pre-configured at `http://localhost:8081/swagger-ui/index.html`.

---

## 💻 2. Technology Stack

| Layer | Technology | Version / Notes |
| :--- | :--- | :--- |
| **Language** | Java | 21 (LTS) / compatible with Java 17+ |
| **Framework** | Spring Boot | 3.2.5 |
| **Build Tool** | Apache Maven | 3.9+ (includes self-contained `mvnw` wrapper) |
| **Web Layer** | Spring Web (MVC) | RESTful controllers returning JSON |
| **Persistence** | Spring Data JPA / Hibernate | 6.x ORM with HikariCP connection pooling |
| **Database** | PostgreSQL | 18 (Local default on port 5432) |
| **Security** | Spring Security | 6.x (Stateless, prepared for JWT) |
| **Validation** | Jakarta Bean Validation | Hibernate Validator (`@NotNull`, `@Size`, `@Min`) |
| **Documentation** | Springdoc OpenAPI / Swagger UI | 2.5.0 (`/swagger-ui/index.html`) |

---

## 📂 3. Package Structure

```
quiet-battles-backend/
├── .mvn/wrapper/                    # Self-contained Maven wrapper binaries
├── src/
│   ├── main/
│   │   ├── java/com/quietbattles/
│   │   │   ├── config/              # Infrastructure beans (CorsConfig, OpenApiConfig)
│   │   │   ├── controller/          # REST controllers (HealthController)
│   │   │   ├── dto/                 # Request & response data transfer objects (HealthResponse)
│   │   │   ├── entity/              # JPA domain entities (Phase 2 target)
│   │   │   ├── exception/           # Global exception handling (GlobalExceptionHandler, ApiErrorResponse)
│   │   │   ├── mapper/              # Entity <-> DTO converters (Phase 2 target)
│   │   │   ├── repository/          # Spring Data JPA repositories (Phase 2 target)
│   │   │   ├── security/            # SecurityFilterChain & PasswordEncoder (SecurityConfig)
│   │   │   ├── service/             # Business logic interfaces & services (Phase 2 target)
│   │   │   └── QuietBattlesApplication.java # Spring Boot entrypoint
│   │   └── resources/
│   │       └── application.properties # Server port, PostgreSQL & Swagger configuration
│   └── test/
│       ├── java/com/quietbattles/   # Unit and MockMvc integration tests
│       └── resources/
│           └── application-test.properties
├── .env.example                     # Environment variables template
├── .gitignore                       # Standard Java / Maven / IDE ignores
├── mvnw & mvnw.cmd                  # Cross-platform Maven wrapper scripts
├── pom.xml                          # Maven build descriptors & dependencies
└── README.md                        # Documentation
```

---

## 🗄️ 4. PostgreSQL Database Setup

### Step 1: Verify PostgreSQL Service
Ensure PostgreSQL is active on port `5432`:
```powershell
Get-Service *postgres*
```

### Step 2: Create the Database
Connect using `psql` and create the target database:
```sql
CREATE DATABASE quiet_battles_db;
```

### Step 3: Configure Environment Variables
You can override credentials at runtime or via environment variables:
```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/quiet_battles_db"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="0000"
$env:SERVER_PORT="8081"
```

Defaults configured in `application.properties`:
- **URL**: `jdbc:postgresql://localhost:5432/quiet_battles_db`
- **Username**: `postgres`
- **Password**: `0000`
- **Port**: `8081`

---

## 🚀 5. Execution Commands

### Clean & Compile
```powershell
cd quiet-battles-backend
.\mvnw.cmd clean compile
```

### Run Tests
```powershell
.\mvnw.cmd test
```

### Package Application JAR
```powershell
.\mvnw.cmd package -DskipTests
```

### Run Spring Boot Application
```powershell
.\mvnw.cmd spring-boot:run
```

The server will start at: [`http://localhost:8081`](http://localhost:8081)

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
- Interactive OpenAPI sandbox detailing endpoints, schema models, and JWT authorize scheme.

### 3. OpenAPI Raw JSON Specification
- **URL**: [`http://localhost:8081/v3/api-docs`](http://localhost:8081/v3/api-docs)

---

## 🛡️ 7. Phase 1 Implementation Notes

- **Spring Security**: Configured in stateless mode. Disables CSRF for REST APIs, connects CORS, explicitly permits `/api/v1/health` and `/swagger-ui/**`, and establishes the foundation for JWT token filters in Phase 3.
- **DDL Mode**: Set to `spring.jpa.hibernate.ddl-auto=update` for local developer velocity. In production, Flyway version-controlled migrations will be introduced.
- **Upcoming Phases**:
  - *Phase 2*: JPA Entities, Repositories, Services, and REST CRUD controllers for Series, Chapters, and Products.
  - *Phase 3*: Spring Security JWT Authentication, Admin User Role, and Refresh Tokens.
  - *Phase 4*: Cloudinary image storage integration & React frontend API client connection.

# QUIET BATTLES™ – Luxury Minimalist Fashion Brand Website

> **"WEAR YOUR BATTLES."**  
> An international luxury streetwear technical assessment project for **Pholus Globos Facility Service Pvt. Ltd.**

---

## 🏛️ Brand Overview & Philosophy

**QUIET BATTLES™** represents inner strength, personal struggles, silent achievements, emotional resilience, and individual identity. Conceived in opposition to contemporary performative culture, the brand creates tactile armor for individuals who fight silent battles without seeking applause or validation.

- **Brand Tagline**: `WEAR YOUR BATTLES.`
- **Inaugural Collection**: `SERIES 01 – THE GENTLE ARMOR™`
- **Assessment Issue**: Frontend Technical Assessment Project
- **Issuing Entity**: Pholus Globos Facility Service Pvt. Ltd.

---

## 💻 Technology Stack

| Layer | Technology |
|---|---|
| **Framework / Bundler** | React.js 18 + Vite |
| **Language** | JavaScript (ES6+ Modules, strictly no TypeScript) |
| **Styling Engine** | Tailwind CSS (v3) + Custom Luxury Utility Classes |
| **Routing** | React Router DOM (v6) with Code Splitting (`React.lazy` + `Suspense`) |
| **Animation** | Framer Motion (respects `prefers-reduced-motion`) |
| **Icons** | Lucide React |
| **State Management** | React Context API (`CartContext`, `ContentContext`, `AdminContext`) |
| **Persistence** | Browser `LocalStorage` with fallback error mitigation |
| **Typography** | Cormorant Garamond, Playfair Display, and Inter via Google Fonts |

---

## 🎨 Visual Identity & Color Palette

| Token | Hex Value | Usage |
|---|---|---|
| **Main Background** | `#0A0A0A` | Primary canvas, cinematic hero, full-width statements |
| **Secondary Background** | `#151515` | Section contrasts, sidebars, drawer overlays |
| **Card Background** | `#1B1B1B` | Product cards, editorial boxes, chapter cards |
| **Primary Text** | `#F5F1EA` | Editorial serif headings, key typography |
| **Secondary Text** | `#A7A29B` | Body narratives, subtitles, captions |
| **Luxury Accent** | `#A88B65` | Muted gold accent, focus rings, hover states |
| **Border Tone** | `#333333` | Architectural minimalist outlines, dividers |

---

## 📂 Project Architecture

```
QUIET BATTLES/
├── frontend/                        # React 18 + Vite Luxury Fashion Brand Application
│   ├── public/                      # Monogram favicon, robots.txt, sitemap.xml
│   ├── src/                         # React components, pages, context, hooks
│   │   ├── admin/                   # Re-exports for evaluation alias paths
│   │   ├── components/              # Reusable UI (home, product, cart, archive, admin)
│   │   ├── context/                 # CartContext, ContentContext, AdminContext
│   │   ├── data/                    # Series, Chapter & Product baseline data
│   │   ├── layouts/                 # PublicLayout & AdminLayout
│   │   ├── pages/                   # Lazy-loaded page components
│   │   └── routes/                  # AppRoutes with ProtectedRoute guard
│   ├── package.json                 # Pure JavaScript dependencies
│   ├── vite.config.js               # Port 3000
│   └── vercel.json                  # SPA routing rules
├── backend/                         # Spring Boot 3.2.5 REST API Service
│   ├── src/                         # Java controllers, config, security, exceptions
│   ├── pom.xml                      # Maven dependencies
│   ├── mvnw & mvnw.cmd              # Self-contained Maven wrapper
│   └── README.md                    # Backend engineering documentation
├── docs/                            # Architectural guides & technical presentation
├── README.md                        # Master repository documentation
├── SUBMISSION_CHECKLIST.md          # Technical assessment verification checklist
└── vercel.json                      # Monorepo deployment configuration
```

---

## 🚀 Setup & Execution Instructions

### Frontend (React + Vite)
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Launch development server on port 3000
npm run dev

# 4. Compile production build
npm run build
```

### Backend (Spring Boot + Neon PostgreSQL)
```bash
# 1. Navigate to backend directory
cd backend

# 2. Compile source code
.\mvnw.cmd clean compile

# 3. Execute automated unit & integration tests
.\mvnw.cmd test

# 4. Launch Spring Boot application on port 8081
.\mvnw.cmd spring-boot:run
```

---

## 🔑 Demonstration Admin CMS Login

The admin panel is accessible at `/admin/login` or via the discrete lock / "Admin CMS Demo" link in the footer and navbar.

- **Admin Login URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@quietbattles.demo`
- **Password**: `QuietBattles@2026`
- **Autofill Helper**: A convenient *"Autofill Form"* button is provided on the login page for instantaneous 1-click evaluation.

> [!NOTE]
> This is a frontend-only demonstration authentication session. Credentials and session tokens are simulated and stored in browser `LocalStorage` without claiming to be production security.

---

## ✨ Implemented Features

### Public Storefront
1. **Cinematic Hero**: 100vh desktop hero with background subtle zoom, dark multi-layer gradients, large Cormorant Garamond typography, and CTAs.
2. **Split Brand Introduction**: High-contrast editorial imagery with statement quotes and typography.
3. **Featured Series**: Showcase card for Series 01 with chapter counts and narrative previews.
4. **Brand Philosophy**: Three architectural axiom blocks: *01 Silence*, *02 Strength*, *03 Identity*.
5. **Featured Product**: Signature piece showcase for *THE GENTLE ARMOR OVERSIZED TEE* with price (₹1,499) and direct purchase link.
6. **Brand Statement**: Full-width typographic tribute: *"YOUR STORY. YOUR STRENGTH. YOUR ARMOR."*
7. **The Archive (`/archive`)**: Curated overview of series editions with hover zoom effects.
8. **Series Detail (`/archive/series-01`)**: Full-width cover, curatorial statement, and cards for all 5 chapters.
9. **All Five Chapters Available**:
   - `Chapter 01 — THE SILENCE` (Opening quote, main story, visual study, related product)
   - `Chapter 02 — THE WEIGHT`
   - `Chapter 03 — THE RESILIENCE`
   - `Chapter 04 — THE REBUILDING`
   - `Chapter 05 — THE GENTLE ARMOR`
10. **Previous & Next Story Navigation**: Reusable chapter component with sequential pagination between chapters.
11. **Interactive Product Detail (`/products/gentle-armor`)**:
    - Multi-view interactive product gallery (thumbnails + large display)
    - Size selector (S, M, L, XL, XXL) with active state validation
    - Quantity selector (+ / -)
    - Add to Cart with confirmation feedback toast and navbar badge increment
    - Expandable accordions for Fabric Details, Care Instructions, and Delivery Guarantee
    - Related armor product suggestions
12. **Shopping Bag (`/cart`)**:
    - Item breakdown with thumbnails, sizes, prices, and quantities
    - Real-time subtotal calculation and free shipping threshold
    - Remove items and clear cart actions
    - LocalStorage persistence across page reloads
    - Assessment modal on checkout: *"Checkout functionality is not available in this assessment prototype."*
13. **Brand Storytelling (`/about`)**: Editorial essay on *"The Story Behind the Silence"*, material philosophy, and the meaning of *Wear Your Battles*.
14. **Contact Page (`/contact`)**: Minimal form with client-side field validation, studio hours, and demo success state.
15. **Editorial 404 Page (`*`)**: Luxury styled missing-page fallback with quick return triggers.

### Admin CMS Panel
1. **CMS Dashboard (`/admin/dashboard`)**: Summary cards (Total Series, Chapters, Products, Published Items), quick-add triggers, and recent inventory tables.
2. **Series Management (`/admin/series`)**: Create, Edit, and Delete series editions. Live image preview and instant reflection on the public Archive.
3. **Chapter Management (`/admin/chapters`)**: Author stories, edit opening quotes, update themes, assign parent series, and attach related garments.
4. **Product Management (`/admin/products`)**: Manage pricing, categories, sizing tags, stock levels, and photography URLs.
5. **Deletion Protection**: Confirmation modals with item name verification before deletion.
6. **Data Reset**: *"Reset Demo Data"* button in sidebar to restore initial sample baseline at any time.

---

## 🌐 Vercel Deployment Instructions

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete QUIET BATTLES luxury fashion brand website"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. **Connect to Vercel**:
   - Log in to [Vercel](https://vercel.com).
   - Click **"Add New Project"** and import the repository.
   - Framework Preset: **Vite**.
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
3. **Client-Side Routing (`vercel.json`)**:
   - The included `vercel.json` ensures all deep routes (e.g. `/archive/series-01/chapter-01`, `/admin/dashboard`) redirect to `index.html` without 404 errors on browser refresh:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
4. **Deploy**:
   - Click **Deploy**. Vercel will build the project and output a live production URL in less than 60 seconds.

---

## ⚠️ Frontend-Only Limitations

In strict adherence to the assessment instructions prohibiting backends, databases, and external payment APIs:
1. **No Backend / Database**: No Node.js, Spring Boot, PostgreSQL, MongoDB, or external database APIs are implemented.
2. **Payment Processing**: Checkout does not connect to Stripe, Razorpay, or banks; an assessment prototype notice is shown instead.
3. **Authentication**: Admin credentials validate locally on the client; session status resides in `LocalStorage`.
4. **Persistence Scope**: Content created or edited in the Admin CMS persists in the reviewer's browser `LocalStorage`. Clearing browser cache restores the baseline dataset.
5. **Contact Form**: Form data is validated on the client and stored in local state; no external SMTP mailer is triggered.

For complete architectural details, interview defenses, and Spring Boot / PostgreSQL integration roadmaps, refer to:
- [📖 Project Overview & Architecture Guide](docs/project-overview.md)
- [🎙️ Technical Presentation & Interview Defense](docs/technical-presentation.md)

---

## 📄 License & Credits
- **Company**: Pholus Globos Facility Service Pvt. Ltd.
- **Project**: QUIET BATTLES™
- **All Rights Reserved**: © 2026 QUIET BATTLES™.


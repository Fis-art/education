# Project Structure Documentation
# SMK Teknologi Plus - Website & Admin Dashboard

---

## 1. Monorepo Root Structure

```text
smk-teknologi-plus/
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI Pipeline (Lint, Typecheck, Test, Build)
│       ├── deploy-staging.yml  # Deploy to Staging
│       └── deploy-production.yml # Deploy to Production
├── docs/                       # Project Documentation (This Folder)
│   ├── README.md
│   ├── PRD.md
│   ├── SYSTEM_DESIGN.md
│   ├── DATABASE_ERD.md
│   ├── PROJECT_STRUCTURE.md
│   ├── UI_UX.md
│   ├── API_DOCUMENTATION.md
│   └── ROADMAP_CODING.md
├── frontend/                   # React + Vite Application
├── backend/                    # Node.js + Express API
├── database/                   # Database Migrations & Seeders
│   ├── migrations/
│   └── seeders/
├── shared/                     # Shared Types & Utilities (Optional - Future)
├── .gitignore
├── .editorconfig
├── package.json                # Root package.json (Workspaces)
├── pnpm-workspace.yaml         # pnpm Workspace Config (if using pnpm)
├── turbo.json                  # Turborepo Config (if using Turborepo)
├── docker-compose.yml          # Local Development Stack
├── Dockerfile.frontend         # Frontend Production Image
├── Dockerfile.backend          # Backend Production Image
└── README.md                   # Root README
```

---

## 2. Frontend Structure (`frontend/`)

```text
frontend/
├── public/                     # Static Assets (served as-is)
│   ├── favicon.ico
│   ├── robots.txt
│   ├── manifest.json           # PWA Manifest
│   └── images/                 # Static images (logo, og-default, etc.)
├── src/
│   ├── assets/                 # Processed Assets (imported in code)
│   │   ├── images/
│   │   ├── fonts/
│   │   └── styles/
│   │       ├── globals.css     # Global styles, CSS Variables, Tailwind @import
│   │       └── variables.css   # Design Tokens (Colors, Spacing, Typography)
│   │
│   ├── components/             # Shared UI Components (Atomic Design)
│   │   ├── ui/                 # Primitive Components (Shadcn/UI based)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── label.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── table.tsx       # TanStack Table Wrapper
│   │   │   ├── data-table.tsx  # Advanced DataTable (Sort, Filter, Pagination)
│   │   │   ├── date-picker.tsx
│   │   │   ├── image-upload.tsx
│   │   │   ├── rich-text-editor.tsx  # Tiptap Wrapper
│   │   │   └── index.ts        # Barrel Export
│   │   │
│   │   ├── layout/             # Layout Components
│   │   │   ├── public-layout.tsx       # Public Website Layout
│   │   │   ├── admin-layout.tsx        # Admin Dashboard Layout
│   │   │   ├── header/
│   │   │   │   ├── public-header.tsx
│   │   │   │   ├── admin-header.tsx
│   │   │   │   ├── mobile-menu.tsx
│   │   │   │   └── search-modal.tsx
│   │   │   ├── footer/
│   │   │   │   ├── public-footer.tsx
│   │   │   │   └── admin-footer.tsx
│   │   │   ├── sidebar/
│   │   │   │   ├── admin-sidebar.tsx
│   │   │   │   ├── sidebar-nav.tsx
│   │   │   │   └── user-menu.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── container.tsx
│   │   │   └── page-header.tsx
│   │   │
│   │   ├── forms/              # Form Components
│   │   │   ├── form-field.tsx        # Wrapper with Label, Error, Hint
│   │   │   ├── form-select.tsx
│   │   │   ├── form-date-picker.tsx
│   │   │   ├── form-rich-text.tsx
│   │   │   ├── form-file-upload.tsx
│   │   │   ├── form-image-upload.tsx
│   │   │   ├── form-checkbox-group.tsx
│   │   │   ├── form-radio-group.tsx
│   │   │   └── form-submit.tsx
│   │   │
│   │   ├── data-display/       # Data Display Components
│   │   │   ├── stats-card.tsx
│   │   │   ├── info-card.tsx
│   │   │   ├── news-card.tsx
│   │   │   ├── event-card.tsx
│   │   │   ├── achievement-card.tsx
│   │   │   ├── gallery-grid.tsx
│   │   │   ├── teacher-card.tsx
│   │   │   ├── department-card.tsx
│   │   │   ├── chart-wrapper.tsx
│   │   │   ├── empty-state.tsx
│   │   │   └── loading-state.tsx
│   │   │
│   │   ├── feedback/           # Feedback Components
│   │   │   ├── alert.tsx
│   │   │   ├── confirmation-dialog.tsx
│   │   │   ├── error-boundary.tsx
│   │   │   └── maintenance-banner.tsx
│   │   │
│   │   └── navigation/         # Navigation Components
│   │       ├── main-nav.tsx
│   │       ├── footer-links.tsx
│   │       ├── pagination.tsx
│   │       └── language-switcher.tsx
│   │
│   ├── features/               # Feature-Based Modules (Domain-Driven)
│   │   ├── auth/               # Authentication Feature
│   │   │   ├── components/
│   │   │   │   ├── login-form.tsx
│   │   │   │   └── protected-route.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-auth.ts
│   │   │   │   └── use-permissions.ts
│   │   │   ├── context/
│   │   │   │   └── auth-context.tsx
│   │   │   ├── services/
│   │   │   │   └── auth-api.ts
│   │   │   ├── types/
│   │   │   │   └── auth.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── public/             # Public Website Features
│   │   │   ├── home/
│   │   │   │   ├── components/
│   │   │   │   │   ├── hero-slider.tsx
│   │   │   │   │   ├── welcome-section.tsx
│   │   │   │   │   ├── stats-section.tsx
│   │   │   │   │   ├── latest-news.tsx
│   │   │   │   │   ├── latest-achievements.tsx
│   │   │   │   │   ├── upcoming-events.tsx
│   │   │   │   │   └── gallery-section.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── use-home-data.ts
│   │   │   │   ├── home-page.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── profil/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── tentang-sekolah.tsx
│   │   │   │   │   ├── visi-misi.tsx
│   │   │   │   │   ├── sejarah.tsx
│   │   │   │   │   ├── struktur-organisasi.tsx
│   │   │   │   │   └── fasilitas.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── akademik/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── jurusan-list.tsx
│   │   │   │   │   ├── jurusan-detail.tsx
│   │   │   │   │   ├── guru-list.tsx
│   │   │   │   │   ├── ekstrakurikuler.tsx
│   │   │   │   │   └── kalender-akademik.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── informasi/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── berita-list.tsx
│   │   │   │   │   ├── berita-detail.tsx
│   │   │   │   │   ├── pengumuman-list.tsx
│   │   │   │   │   ├── agenda-list.tsx
│   │   │   │   │   └── prestasi-list.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── ppdb/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ppdb-info.tsx
│   │   │   │   │   ├── ppdb-form-step1.tsx  # Data Pribadi
│   │   │   │   │   ├── ppdb-form-step2.tsx  # Data Orang Tua
│   │   │   │   │   ├── ppdb-form-step3.tsx  # Data Sekolah & Pilihan
│   │   │   │   │   ├── ppdb-form-step4.tsx  # Upload Berkas
│   │   │   │   │   ├── ppdb-form-step5.tsx  # Review & Submit
│   │   │   │   │   ├── ppdb-status-check.tsx
│   │   │   │   │   └── ppdb-announcements.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── use-ppdb-form.ts
│   │   │   │   ├── pages/
│   │   │   │   │   ├── ppdb-info-page.tsx
│   │   │   │   │   ├── ppdb-register-page.tsx
│   │   │   │   │   └── ppdb-status-page.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── lain/
│   │   │   │   ├── components/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── download-page.tsx
│   │   │   │   │   ├── faq-page.tsx
│   │   │   │   │   ├── kontak-page.tsx
│   │   │   │   │   └── galeri-page.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   └── admin/              # Admin Dashboard Features
│   │       ├── dashboard/
│   │       │   ├── components/
│   │       │   │   ├── stats-cards.tsx
│   │       │   │   ├── visitors-chart.tsx
│   │       │   │   ├── news-category-chart.tsx
│   │       │   │   ├── recent-activity.tsx
│   │       │   │   └── quick-actions.tsx
│   │       │   ├── hooks/
│   │       │   │   └── use-dashboard-data.ts
│   │       │   ├── dashboard-page.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── users/
│   │       │   ├── components/
│   │       │   │   ├── user-table.tsx
│   │       │   │   ├── user-form.tsx
│   │       │   │   └── user-detail.tsx
│   │       │   ├── hooks/
│   │       │   │   └── use-users.ts
│   │       │   ├── pages/
│   │       │   │   ├── users-list-page.tsx
│   │       │   │   ├── user-create-page.tsx
│   │       │   │   └── user-edit-page.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── guru/
│   │       ├── jurusan/
│   │       ├── ekstrakurikuler/
│   │       ├── hero-slider/
│   │       ├── berita/
│   │       ├── pengumuman/
│   │       ├── agenda/
│   │       ├── prestasi/
│   │       ├── galeri/
│   │       ├── download/
│   │       ├── ppdb/
│   │       │   ├── components/
│   │       │   ├── pages/
│   │       │   │   ├── ppdb-tahun-ajaran-page.tsx
│   │       │   │   ├── ppdb-pendaftar-page.tsx
│   │       │   │   └── ppdb-verification-page.tsx
│   │       │   └── index.ts
│   │       │
│   │       └── setting/
│   │           ├── components/
│   │           │   ├── setting-form.tsx
│   │           │   ├── setting-group.tsx
│   │           │   └── maintenance-toggle.tsx
│   │           ├── pages/
│   │           │   └── setting-page.tsx
│   │           └── index.ts
│   │
│   ├── hooks/                  # Shared Custom Hooks
│   │   ├── use-debounce.ts
│   │   ├── use-local-storage.ts
│   │   ├── use-media-query.ts
│   │   ├── use-click-outside.ts
│   │   ├── use-keyboard-shortcut.ts
│   │   ├── use-copy-to-clipboard.ts
│   │   ├── use-intersection-observer.ts
│   │   └── index.ts
│   │
│   ├── context/                # React Context Providers
│   │   ├── auth-context.tsx
│   │   ├── theme-context.tsx
│   │   ├── toast-context.tsx
│   │   ├── modal-context.tsx
│   │   └── index.ts
│   │
│   ├── services/               # API Service Layer
│   │   ├── api.ts              # Axios Instance + Interceptors
│   │   ├── public-api.ts       # Public Endpoints
│   │   ├── admin-api.ts        # Admin Endpoints
│   │   ├── auth-api.ts         # Auth Endpoints
│   │   ├── upload-api.ts       # Upload Endpoints
│   │   └── index.ts
│   │
│   ├── utils/                  # Utility Functions
│   │   ├── cn.ts               # classNames utility (clsx + tailwind-merge)
│   │   ├── format.ts           # formatDate, formatCurrency, formatNumber
│   │   ├── validation.ts       # Zod Schemas Re-export
│   │   ├── slugify.ts
│   │   ├── constants.ts        # App Constants
│   │   ├── helpers.ts          # Generic Helpers
│   │   └── index.ts
│   │
│   ├── styles/                 # Global Styles & Tailwind
│   │   ├── globals.css
│   │   ├── variables.css
│   │   ├── animations.css
│   │   ├── print.css
│   │   └── tailwind.css        # Tailwind Directives
│   │
│   ├── routes/                 # Routing Configuration
│   │   ├── public-routes.tsx
│   │   ├── admin-routes.tsx
│   │   ├── route-config.ts     # Route Definitions with Metadata
│   │   └── index.ts
│   │
│   ├── types/                  # TypeScript Types
│   │   ├── api.ts              # API Response Types
│   │   ├── models.ts           # Domain Models
│   │   ├── forms.ts            # Form Types
│   │   ├── ui.ts               # UI Component Props
│   │   └── index.ts
│   │
│   ├── App.tsx                 # Root Component
│   ├── main.tsx                # Entry Point
│   └── vite-env.d.ts           # Vite Type Declarations
│
├── index.html                  # HTML Template
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.cjs
├── .prettierrc
├── .env.example
├── .env.development
├── .env.production
└── README.md
```

---

## 3. Backend Structure (`backend/`)

```text
backend/
├── src/
│   ├── config/                 # Configuration Files
│   │   ├── database.ts         # Knex Configuration (Multi-env)
│   │   ├── redis.ts            # Redis Client (ioredis)
│   │   ├── jwt.ts              # JWT Configuration (Keys, Expiry)
│   │   ├── multer.ts           # Multer Config (Storage, Limits)
│   │   ├── env.ts              # Validated Environment Variables (Zod)
│   │   ├── cors.ts             # CORS Options
│   │   ├── helmet.ts           # Helmet Options
│   │   └── index.ts
│   │
│   ├── middlewares/            # Express Middlewares
│   │   ├── authenticate.ts     # JWT Verification
│   │   ├── authorize.ts        # RBAC Authorization
│   │   ├── validate.ts         # Zod Validation (body, query, params)
│   │   ├── error-handler.ts    # Global Error Handler
│   │   ├── rate-limiter.ts     # Rate Limiting
│   │   ├── logger.ts           # Request Logging (Morgan + Winston)
│   │   ├── not-found.ts        # 404 Handler
│   │   ├── cors.ts             # CORS Middleware
│   │   └── index.ts
│   │
│   ├── modules/                # Feature Modules (Domain-Driven)
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.validator.ts
│   │   │   ├── auth.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.routes.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── users.validator.ts
│   │   │   ├── users.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── guru/
│   │   │   ├── guru.routes.ts
│   │   │   ├── guru.controller.ts
│   │   │   ├── guru.service.ts
│   │   │   ├── guru.repository.ts
│   │   │   ├── guru.validator.ts
│   │   │   ├── guru.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── jurusan/
│   │   │   ├── jurusan.routes.ts
│   │   │   ├── jurusan.controller.ts
│   │   │   ├── jurusan.service.ts
│   │   │   ├── jurusan.repository.ts
│   │   │   ├── jurusan.validator.ts
│   │   │   ├── jurusan.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── ekstrakurikuler/
│   │   ├── hero-slider/
│   │   ├── berita/
│   │   ├── pengumuman/
│   │   ├── agenda/
│   │   ├── prestasi/
│   │   ├── galeri/
│   │   ├── download/
│   │   │
│   │   ├── ppdb/
│   │   │   ├── ppdb-tahun-ajaran/
│   │   │   │   ├── ppdb-tahun-ajaran.routes.ts
│   │   │   │   ├── ppdb-tahun-ajaran.controller.ts
│   │   │   │   ├── ppdb-tahun-ajaran.service.ts
│   │   │   │   ├── ppdb-tahun-ajaran.repository.ts
│   │   │   │   ├── ppdb-tahun-ajaran.validator.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── ppdb-pendaftar/
│   │   │       ├── ppdb-pendaftar.routes.ts
│   │   │       ├── ppdb-pendaftar.controller.ts
│   │   │       ├── ppdb-pendaftar.service.ts
│   │   │       ├── ppdb-pendaftar.repository.ts
│   │   │       ├── ppdb-pendaftar.validator.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── setting/
│   │   │   ├── setting.routes.ts
│   │   │   ├── setting.controller.ts
│   │   │   ├── setting.service.ts
│   │   │   ├── setting.repository.ts
│   │   │   ├── setting.validator.ts
│   │   │   └── index.ts
│   │   │
│   │   └── upload/
│   │       ├── upload.routes.ts
│   │       ├── upload.controller.ts
│   │       ├── upload.service.ts
│   │       ├── upload.validator.ts
│   │       └── index.ts
│   │
│   ├── shared/                 # Shared Code
│   │   ├── database/
│   │   │   ├── knex.ts         # Knex Instance
│   │   │   ├── base-repository.ts  # Generic Base Repository
│   │   │   └── transaction.ts  # Transaction Helper
│   │   │
│   │   ├── errors/
│   │   │   ├── app-error.ts
│   │   │   ├── validation-error.ts
│   │   │   ├── not-found-error.ts
│   │   │   ├── unauthorized-error.ts
│   │   │   ├── forbidden-error.ts
│   │   │   ├── conflict-error.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── slugify.ts
│   │   │   ├── jwt.ts          # Token Generate/Verify
│   │   │   ├── password.ts     # Hash/Compare
│   │   │   ├── file-upload.ts  # Multer + Sharp Processing
│   │   │   ├── date.ts
│   │   │   ├── string.ts
│   │   │   ├── pagination.ts   # Paginate Helper
│   │   │   └── index.ts
│   │   │
│   │   ├── types/
│   │   │   ├── api.ts          # ApiResponse, PaginatedResponse
│   │   │   ├── auth.ts         # JWTPayload, UserSession
│   │   │   ├── database.ts     # Knex Types
│   │   │   └── index.ts
│   │   │
│   │   └── constants/
│   │       ├── roles.ts
│   │       ├── status.ts
│   │       ├── file-limits.ts
│   │       └── index.ts
│   │
│   ├── app.ts                  # Express App Setup
│   └── server.ts               # Entry Point
│
├── database/
│   ├── migrations/             # Knex Migrations
│   │   ├── 20260719100000_create_roles_table.ts
│   │   ├── 20260719100001_create_users_table.ts
│   │   ├── 20260719100002_create_jurusan_table.ts
│   │   ├── 20260719100003_create_guru_table.ts
│   │   ├── 20260719100004_create_ekstrakurikuler_table.ts
│   │   ├── 20260719100005_create_news_categories_table.ts
│   │   ├── 20260719100006_create_gallery_categories_table.ts
│   │   ├── 20260719100007_create_berita_table.ts
│   │   ├── 20260719100008_create_pengumuman_table.ts
│   │   ├── 20260719100009_create_agenda_table.ts
│   │   ├── 20260719100010_create_prestasi_table.ts
│   │   ├── 20260719100011_create_galeri_table.ts
│   │   ├── 20260719100012_create_hero_slider_table.ts
│   │   ├── 20260719100013_create_facilities_table.ts
│   │   ├── 20260719100014_create_ppdb_tahun_ajaran_table.ts
│   │   ├── 20260719100015_create_ppdb_tahun_ajaran_kuota_table.ts
│   │   ├── 20260719100016_create_ppdb_pendaftar_table.ts
│   │   ├── 20260719100017_create_download_categories_table.ts
│   │   ├── 20260719100018_create_downloads_table.ts
│   │   ├── 20260719100019_create_contacts_table.ts
│   │   ├── 20260719100020_create_faqs_table.ts
│   │   ├── 20260719100021_create_settings_table.ts
│   │   └── 20260719100022_create_activity_logs_table.ts
│   │
│   └── seeders/
│       ├── 01_roles.ts
│       ├── 02_users.ts
│       ├── 03_news_categories.ts
│       ├── 04_gallery_categories.ts
│       ├── 05_download_categories.ts
│       ├── 06_settings.ts
│       └── 07_sample_data.ts
│
├── tests/                      # Test Files
│   ├── unit/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   ├── integration/
│   │   ├── auth.test.ts
│   │   ├── berita.test.ts
│   │   ├── ppdb.test.ts
│   │   └── upload.test.ts
│   ├── fixtures/
│   └── setup.ts
│
├── package.json
├── tsconfig.json
├── knexfile.ts                 # Knex CLI Config
├── jest.config.ts
├── .eslintrc.cjs
├── .prettierrc
├── .env.example
├── .env.development
├── .env.production
├── nodemon.json
└── README.md
```

---

## 4. Database Structure (`database/`)

```text
database/
├── migrations/                 # Versioned SQL/TypeScript Migrations
│   └── (see backend/database/migrations)
└── seeders/                    # Seed Data Scripts
    └── (see backend/database/seeders)
```

---

## 5. Shared Package (Optional - Future)

```text
shared/
├── src/
│   ├── types/                  # Shared TypeScript Types
│   │   ├── api.ts
│   │   ├── models.ts
│   │   └── index.ts
│   ├── constants/              # Shared Constants
│   │   ├── roles.ts
│   │   ├── status.ts
│   │   └── index.ts
│   ├── validators/             # Shared Zod Schemas
│   │   ├── common.ts
│   │   └── index.ts
│   └── utils/                  # Shared Utilities
│       ├── date.ts
│       ├── string.ts
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 6. Configuration Files Detail

### 6.1 Root `package.json` (Workspaces)
```json
{
  "name": "smk-teknologi-plus",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "frontend",
    "backend",
    "shared"
  ],
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "npm run dev --workspace=frontend",
    "dev:backend": "npm run dev --workspace=backend",
    "build": "npm run build --workspaces",
    "build:frontend": "npm run build --workspace=frontend",
    "build:backend": "npm run build --workspace=backend",
    "lint": "npm run lint --workspaces",
    "typecheck": "npm run typecheck --workspaces",
    "test": "npm run test --workspaces",
    "db:migrate": "npm run migrate --workspace=backend",
    "db:seed": "npm run seed --workspace=backend",
    "db:reset": "npm run migrate:reset --workspace=backend && npm run seed --workspace=backend",
    "prepare": "husky install"
  },
  "devDependencies": {
    "concurrently": "^8.2.0",
    "husky": "^8.0.0",
    "turbo": "^1.13.0"
  },
  "engines": {
    "node": ">=20.0.0"
  },
  "packageManager": "pnpm@9.0.0"
}
```

### 6.2 `pnpm-workspace.yaml`
```yaml
packages:
  - frontend
  - backend
  - shared
```

### 6.3 `turbo.json` (Turborepo)
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    },
    "lint": {},
    "typecheck": {},
    "test": {
      "outputs": ["coverage/**"],
      "dependsOn": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "db:migrate": {},
    "db:seed": {}
  },
  "globalEnv": ["NODE_ENV", "DATABASE_URL", "JWT_SECRET"]
}
```

### 6.4 `docker-compose.yml` (Local Dev)
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: smk-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: smk_tekplus
      MYSQL_USER: smk_user
      MYSQL_PASSWORD: smk_pass
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: smk-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: smk-frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://backend:3000/api/v1
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: smk-backend
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=mysql://smk_user:smk_pass@mysql:3306/smk_tekplus
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=dev-secret-change-in-production
      - JWT_REFRESH_SECRET=dev-refresh-secret
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_healthy

volumes:
  mysql_data:
  redis_data:
```

---

## 7. Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Files (React Components)** | PascalCase | `UserTable.tsx`, `HeroSlider.tsx` |
| **Files (Hooks, Utils, Types)** | kebab-case | `use-auth.ts`, `format-date.ts`, `api-types.ts` |
| **Directories** | kebab-case | `components/ui`, `features/admin/berita` |
| **Variables/Functions** | camelCase | `getUserById`, `formatRupiah` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `DEFAULT_PAGE_SIZE` |
| **Types/Interfaces** | PascalCase | `User`, `ApiResponse`, `BeritaFormData` |
| **Enums** | PascalCase (TypeScript) | `UserRole`, `BeritaStatus` |
| **Database Tables** | snake_case (plural) | `users`, `news_categories` |
| **Database Columns** | snake_case | `created_at`, `is_active` |
| **API Endpoints** | kebab-case (plural) | `/api/v1/hero-slider`, `/api/v1/ppdb-pendaftar` |
| **Environment Variables** | UPPER_SNAKE_CASE | `DATABASE_URL`, `JWT_SECRET` |
| **Git Branches** | `type/scope-description` | `feat/home-hero-slider`, `fix/auth-refresh-token` |
| **Commit Messages** | Conventional Commits | `feat(auth): add refresh token rotation` |

---

## 8. Import Path Aliases

### Frontend (`tsconfig.json` + `vite.config.ts`)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@features/*": ["src/features/*"],
      "@hooks/*": ["src/hooks/*"],
      "@context/*": ["src/context/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"],
      "@styles/*": ["src/styles/*"],
      "@routes/*": ["src/routes/*"],
      "@types/*": ["src/types/*"],
      "@assets/*": ["src/assets/*"]
    }
  }
}
```

### Backend (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@config/*": ["src/config/*"],
      "@middlewares/*": ["src/middlewares/*"],
      "@modules/*": ["src/modules/*"],
      "@shared/*": ["src/shared/*"]
    }
  }
}
```

---

## 9. Environment Variables

### Frontend (`.env.example`)
```bash
# API
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=SMK Teknologi Plus
VITE_APP_URL=http://localhost:5173

# Features
VITE_ENABLE_PWA=false
VITE_GA_MEASUREMENT_ID=

# Build
VITE_BUILD_ANALYZE=false
```

### Backend (`.env.example`)
```bash
# App
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=smk_tekplus
DATABASE_USER=smk_user
DATABASE_PASSWORD=smk_pass
DATABASE_SSL=false

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
JWT_ALGORITHM=RS256
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
JWT_ISSUER=smk-tekplus
JWT_AUDIENCE=smk-tekplus-users

# File Upload
UPLOAD_MAX_SIZE=10485760
UPLOAD_ALLOWED_MIMES=image/jpeg,image/png,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip
UPLOAD_PATH=./uploads

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM_NAME=SMK Teknologi Plus
SMTP_FROM_EMAIL=noreply@smktekplus.sch.id

# Security
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_ROUNDS=12

# Logging
LOG_LEVEL=debug
LOG_FILE=./logs/app.log
```

---

*Document Version: 1.0*
*Last Updated: 2026-07-19*
*Author: Architecture Team*
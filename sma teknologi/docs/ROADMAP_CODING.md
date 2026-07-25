# Implementation Roadmap
# SMK Teknologi Plus - Website & Admin Dashboard

---

## 1. Project Phases Overview

| Phase | Duration | Focus | Key Deliverables |
|-------|----------|-------|------------------|
| **Phase 0: Foundation** | 3 Days | Monorepo Setup, Tooling, CI/CD | Repo, Vite+React, Express, Tailwind, Shadcn, Knex, ESLint, Prettier, Husky, GitHub Actions |
| **Phase 1: Auth & Core Backend** | 5 Days | Authentication, RBAC, Core Infrastructure | JWT Auth, Refresh Token, RBAC Middleware, User CRUD, Error Handling, Logging, File Upload, API Docs (Swagger) |
| **Phase 2: Master Data API & Admin UI** | 7 Days | Guru, Jurusan, Ekstrakurikuler | REST API + Admin Pages (List, Create, Edit, Detail), DataTable, Form Validation, Image Upload |
| **Phase 3: Content Management API & Admin UI** | 10 Days | Berita, Pengumuman, Agenda, Prestasi, Galeri, Download, Hero Slider | Rich Text Editor (Tiptap), Multi-image Upload, Drag-drop Reorder, Publish Scheduling, Bulk Actions, SEO Fields |
| **Phase 4: PPDB Module** | 7 Days | Tahun Ajaran, Kuota, Form Pendaftaran, Verifikasi, Export | Multi-step Form (Public), Admin Verification Dashboard, Status Check (Public), Excel Export |
| **Phase 5: Public Website Frontend** | 10 Days | Home, Profil, Akademik, Informasi, PPDB, Lainnya | SSR/CSR Pages, SEO, Responsive, Performance Optimized, Accessibility |
| **Phase 6: Integration & Polish** | 5 Days | Connect FE-BE, E2E Testing, Bug Fixes, Optimization | Full Integration, Lighthouse >90, Cross-browser, Load Testing |
| **Phase 7: Deployment & Handover** | 3 Days | Production Deploy, Monitoring, Documentation | Live Site, SSL, Backup, Runbooks, Knowledge Transfer |

**Total Estimated Duration: ~50 Working Days (10 Weeks)**

---

## 2. Sprint Breakdown (2-Week Sprints)

### Sprint 1 (Week 1-2): Foundation & Auth
**Goal**: Runnable monorepo with working Auth

| Task | Owner | Est. | Status |
|------|-------|------|--------|
| Initialize Monorepo (pnpm workspaces + Turborepo) | DevOps | 0.5d | ☐ |
| Setup Frontend: Vite + React + TS + Tailwind + Shadcn/UI | FE | 1d | ☐ |
| Setup Backend: Express + TS + Knex + MySQL | BE | 1d | ☐ |
| Configure ESLint, Prettier, Husky, Commitlint | DevOps | 0.5d | ☐ |
| Setup GitHub Actions CI (Lint, Typecheck, Test, Build) | DevOps | 1d | ☐ |
| Database: Knex Config, Migration Runner, Seeder | BE | 1d | ☐ |
| Run Initial Migrations (roles, users, settings) | BE | 0.5d | ☐ |
| JWT Auth: Register, Login, Refresh, Logout, Me | BE | 2d | ☐ |
| RBAC Middleware (authenticate, authorize) | BE | 0.5d | ☐ |
| User Management API (Super Admin only) | BE | 1d | ☐ |
| Auth UI: Login Page, Protected Routes, Auth Context | FE | 1.5d | ☐ |
| Admin Layout: Sidebar, Header, Breadcrumbs, Theme Toggle | FE | 1d | ☐ |
| User Management Admin Pages (List, Create, Edit) | FE | 1d | ☐ |
| Swagger/OpenAPI Setup | BE | 0.5d | ☐ |
| **Sprint Review & Retro** | All | 0.5d | ☐ |

### Sprint 2 (Week 3-4): Master Data
**Goal**: Guru, Jurusan, Ekstrakurikuler fully manageable

| Task | Owner | Est. | Status |
|------|-------|------|--------|
| Migrations: guru, jurusan, ekstrakurikuler | BE | 0.5d | ☐ |
| Guru API: CRUD, Filter, Search, Pagination, Export | BE | 1.5d | ☐ |
| Jurusan API: CRUD, Reorder (Drag-drop), Coordinator FK | BE | 1d | ☐ |
| Ekstrakurikuler API: CRUD | BE | 0.5d | ☐ |
| File Upload Service (Multer + Sharp + Validation) | BE | 1d | ☐ |
| Guru Admin: DataTable, Modal Form, Image Upload, Import CSV | FE | 2d | ☐ |
| Jurusan Admin: Table, Form, Drag-drop Reorder, Coordinator Select | FE | 1.5d | ☐ |
| Ekstrakurikuler Admin: Table, Form | FE | 0.5d | ☐ |
| Shared Components: DataTable, FormField, ImageUpload, ConfirmDialog | FE | 1d | ☐ |
| **Sprint Review & Retro** | All | 0.5d | ☐ |

### Sprint 3 (Week 5-6): Content Management - Part 1
**Goal**: Berita, Pengumuman, Agenda, Prestasi

| Task | Owner | Est. | Status |
|------|-------|------|--------|
| Migrations: news_categories, berita, pengumuman, agenda, prestasi | BE | 0.5d | ☐ |
| News Categories API | BE | 0.5d | ☐ |
| Berita API: CRUD, Slug, Publish/Archive, Schedule, SEO, Featured, View Count | BE | 2d | ☐ |
| Pengumuman API: CRUD, Priority, Pin, Date Range | BE | 1d | ☐ |
| Agenda API: CRUD, Status Auto-calc (upcoming/ongoing/completed) | BE | 1d | ☐ |
| Prestasi API: CRUD, Filter Tingkat/Jenis/Tahun | BE | 1d | ☐ |
| Rich Text Editor Integration (Tiptap) - Shared Component | FE | 1.5d | ☐ |
| Berita Admin: List (Filter Status/Kategori), Create/Edit (Tiptap, SEO, Thumbnail, Tags, Schedule) | FE | 2.5d | ☐ |
| Pengumuman Admin: List, Form | FE | 0.5d | ☐ |
| Agenda Admin: List, Form, Calendar View | FE | 1d | ☐ |
| Prestasi Admin: List, Form | FE | 0.5d | ☐ |
| **Sprint Review & Retro** | All | 0.5d | ☐ |

### Sprint 4 (Week 7-8): Content Management - Part 2 & Settings
**Goal**: Galeri, Download, Hero Slider, Settings

| Task | Owner | Est. | Status |
|------|-------|------|--------|
| Migrations: gallery_categories, galeri, download_categories, downloads, hero_slider, facilities | BE | 0.5d | ☐ |
| Galeri API: CRUD, Multiple Upload, Drag-drop Sort, Category | BE | 1.5d | ☐ |
| Download API: CRUD, File Upload, Counter | BE | 1d | ☐ |
| Hero Slider API: CRUD, Reorder, Date Range, Desktop/Mobile Image | BE | 1d | ☐ |
| Facilities API: CRUD | BE | 0.5d | ☐ |
| Settings API: Get (Grouped), Update (Partial), File Upload for Logo/Favicon/OG | BE | 1d | ☐ |
| Galeri Admin: Grid, Multi-upload Modal, Drag-drop Reorder, Category Filter | FE | 2d | ☐ |
| Download Admin: Table, Form, File Upload | FE | 1d | ☐ |
| Hero Slider Admin: List, Form (Dual Image), Reorder, Preview | FE | 1.5d | ☐ |
| Facilities Admin: Grid, Form | FE | 0.5d | ☐ |
| Settings Admin: Tabbed Form (Identity, Social, SEO, Footer, Email, Maintenance) | FE | 2d | ☐ |
| Dashboard Admin: Stats Cards, Charts (Visitors, News by Category), Recent Activity, Quick Actions | FE | 2d | ☐ |
| **Sprint Review & Retro** | All | 0.5d | ☐ |

### Sprint 5 (Week 9-10): PPDB Module
**Goal**: Complete PPDB Flow (Public + Admin)

| Task | Owner | Est. | Status |
|------|-------|------|--------|
| Migrations: ppdb_tahun_ajaran, ppdb_tahun_ajaran_kuota, ppdb_pendaftar | BE | 0.5d | ☐ |
| Tahun Ajaran API: CRUD, Kuota per Jurusan per Jalur | BE | 1.5d | ☐ |
| Pendaftar API (Public): Multi-step Submit, Validation, File Upload, Generate Nomor | BE | 2d | ☐ |
| Pendaftar API (Admin): List (Filter Status/Jalur/Tahun), Detail, Verifikasi (Approve/Reject/Cadangan), Catatan, Export Excel | BE | 2d | ☐ |
| Cek Status API (Public): Nomor Pendaftaran + NISN | BE | 0.5d | ☐ |
| PPDB Public: Info Page (Jalur, Jadwal, Syarat, Kuota) | FE | 1d | ☐ |
| PPDB Public: Multi-step Form (Stepper, Progress, Draft Save localStorage, Validation per Step, File Upload Preview) | FE | 3d | ☐ |
| PPDB Public: Cek Status Page | FE | 0.5d | ☐ |
| PPDB Admin: Tahun Ajaran Manager (CRUD + Kuota Matrix) | FE | 1.5d | ☐ |
| PPDB Admin: Pendaftar Dashboard (Table, Filter, Search, Detail Modal, Verifikasi Action, Bulk Export) | FE | 2d | ☐ |
| **Sprint Review & Retro** | All | 0.5d | ☐ |

### Sprint 6 (Week 11-12): Public Website Frontend
**Goal**: All Public Pages Functional & Beautiful

| Task | Owner | Est. | Status |
|------|-------|------|--------|
| Design System Implementation (Colors, Typography, Spacing, Components) | FE | 1d | ☐ |
| Home Page: Hero Slider, Sambutan, Stats Counter, Latest News, Prestasi, Agenda, Gallery, Footer | FE | 2d | ☐ |
| Profil Pages: Tentang, Visi Misi, Sejarah (Timeline), Struktur Organisasi (Tree), Fasilitas | FE | 2d | ☐ |
| Akademik Pages: Jurusan List + Detail (Visi Misi, Kompetensi, Kurikulum, Prospek, Guru, Galeri), Guru List + Detail, Ekstrakurikuler, Kalender Akademik | FE | 2d | ☐ |
| Informasi Pages: Berita (List + Detail + SEO + Share + Related), Pengumuman, Agenda (List + Calendar), Prestasi | FE | 2d | ☐ |
| PPDB Public Pages (from Sprint 5) - Polish & Connect | FE | 1d | ☐ |
| Lainnya Pages: Download (Category Tabs, Counter), FAQ (Accordion + Category), Kontak (Form + Map + Info), Galeri (Filter + Lightbox) | FE | 1.5d | ☐ |
| SEO Implementation: Meta Tags, Open Graph, Twitter Cards, JSON-LD (Organization, WebSite, Article, Event, Course), Sitemap.xml, Robots.txt | FE | 1.5d | ☐ |
| Performance: Image Optimization (Responsive, Lazy, Blur Placeholder), Code Splitting, Bundle Analysis, Font Optimization | FE | 1d | ☐ |
| Accessibility Audit: Semantic HTML, ARIA, Focus Management, Color Contrast, Skip Link, Reduced Motion | FE | 1d | ☐ |
| Cross-browser Testing (Chrome, Firefox, Safari, Edge) + Mobile Devices | QA | 1d | ☐ |
| **Sprint Review & Retro** | All | 0.5d | ☐ |

### Sprint 7 (Week 13-14): Integration, Testing & Hardening
**Goal**: Production Ready

| Task | Owner | Est. | Status |
|------|-------|------|--------|
| Full FE-BE Integration Testing (All Flows) | All | 2d | ☐ |
| Unit Tests (Backend: Services, Validators, Utils) | BE | 2d | ☐ |
| Integration Tests (API Endpoints) | BE | 1.5d | ☐ |
| Component Tests (Frontend: Critical Components) | FE | 1.5d | ☐ |
| E2E Tests (Cypress/Playwright): Auth, PPDB Flow, Content CRUD | QA | 2d | ☐ |
| Load Testing (k6/Artillery): API & Public Pages | DevOps | 1d | ☐ |
| Security Audit: Helmet, CORS, Rate Limit, Input Validation, File Upload, SQL Injection, XSS | BE | 1d | ☐ |
| Bug Fixing & Polish | All | 2d | ☐ |
| Lighthouse CI (Performance, Accessibility, Best Practices, SEO > 90) | DevOps | 0.5d | ☐ |
| Documentation Finalization (API Docs, Runbooks, Architecture) | All | 1d | ☐ |
| **Sprint Review & Retro** | All | 0.5d | ☐ |

### Sprint 8 (Week 15): Deployment & Go-Live
**Goal**: Live in Production

| Task | Owner | Est. | Status |
|------|-------|------|--------|
| Production Infrastructure Setup (VPS/Cloud, Nginx, SSL, Domain, DNS) | DevOps | 1d | ☐ |
| Dockerize Frontend & Backend (Multi-stage Builds) | DevOps | 1d | ☐ |
| CI/CD Pipeline: Build → Test → Docker Push → Deploy (Staging → Production) | DevOps | 1d | ☐ |
| Database Migration Strategy (Blue-Green / Rolling) | DevOps | 0.5d | ☐ |
| Backup Strategy (Automated Daily DB + Files, Retention, Restore Test) | DevOps | 0.5d | ☐ |
| Monitoring: Uptime, Logs (Loki/ELK), Metrics (Prometheus/Grafana), Alerts | DevOps | 1d | ☐ |
| Staging Deployment & UAT (User Acceptance Testing) | All | 1d | ☐ |
| Production Deployment (Canary/Blue-Green) | DevOps | 0.5d | ☐ |
| Go-Live Checklist & Sign-off | PM + Stakeholders | 0.5d | ☐ |
| Knowledge Transfer & Handover Documentation | All | 1d | ☐ |
| Post-Launch Support (1 Week Hypercare) | All | - | ☐ |

---

## 3. Technical Milestones

| Milestone | Target Date | Criteria |
|-----------|-------------|----------|
| **M1: Repo Ready** | Day 3 | `pnpm dev` runs FE & BE, CI passes |
| **M2: Auth Working** | Day 8 | Login/Logout/Refresh, RBAC, Protected Routes |
| **M3: Master Data CRUD** | Day 18 | Guru, Jurusan, Ekstrakurikuler manageable via Admin UI |
| **M4: Content CMS Ready** | Day 35 | Berita, Pengumuman, Agenda, Prestasi, Galeri, Download, Slider, Settings |
| **M5: PPDB Functional** | Day 45 | Public Registration + Admin Verification + Export |
| **M6: Public Website Live** | Day 55 | All pages render, SEO optimized, Lighthouse >90 |
| **M7: Production Deployed** | Day 60 | Live on domain, SSL, Monitoring, Backups |

---

## 4. Team Structure & Roles

| Role | Responsibilities | Sprint Capacity |
|------|------------------|-----------------|
| **Tech Lead / Architect** | Architecture, Code Review, Technical Decisions, Blockers | 50% Coding, 50% Leadership |
| **Backend Engineer (2)** | API, Database, Auth, Business Logic, Tests | 100% |
| **Frontend Engineer (2)** | UI, State Management, Components, Performance, Accessibility | 100% |
| **DevOps Engineer** | CI/CD, Infrastructure, Docker, Monitoring, Security | 50% (Shared across sprints) |
| **QA Engineer** | Test Plans, Automation (E2E), Manual Testing, Bug Reports | 50% (Ramp up Sprint 3+) |
| **UI/UX Designer** | Design System, Figma, Prototypes, Handoff, Design QA | 25% (Sprint 0-2), then as needed |
| **Project Manager** | Sprint Planning, Stakeholder Comm, Risk, Timeline | 100% |

---

## 5. Risk Register & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Requirement Changes Mid-Sprint | High | High | Strict Sprint Scope, Change Request Process, Buffer in Sprint 7 |
| Design Delays (Stakeholder Feedback) | High | Medium | Use Shadcn/UI Defaults First, Refine Later; Parallel FE Dev with Mock Data |
| PPDB Form Complexity (Validation, Files, Steps) | Medium | High | Build Stepper Component Early, Test Each Step Independently, Use React Hook Form + Zod |
| Image Upload/Processing Performance | Medium | Medium | Sharp Config Tuning, Queue (BullMQ) for Heavy Loads (Future), CDN Ready |
| SEO/SSR Requirements Change | Low | High | Current Plan: CSR + Meta Tags. Document Next.js Migration Path (ADR) |
| Database Migration Issues in Prod | Low | Critical | Test Migrations on Staging Copy, Backup Before Deploy, Rollback Plan |
| Third-party Service Failure (Email, Maps) | Low | Medium | Fallback UI, Graceful Degradation, Circuit Breaker Pattern |
| Team Member Unavailability | Medium | Medium | Cross-training, Documentation, Pair Programming |

---

## 6. Definition of Done (Per Story)

- [ ] Code complete (FE + BE)
- [ ] Unit Tests written & passing (>70% coverage for new code)
- [ ] Integration Tests for API endpoints
- [ ] Code Reviewed & Approved (Min 1 Reviewer)
- [ ] No TypeScript/ESLint Errors
- [ ] Builds Successfully (FE & BE)
- [ ] Deployed to Staging & Verified
- [ ] Acceptance Criteria Met (Demo to PM)
- [ ] Documentation Updated (API Docs, Component Storybook if applicable)
- [ ] Accessibility Checked (axe-core in CI)
- [ ] Performance Budget Met (Bundle Size, API Latency)

---

## 7. Communication Cadence

| Meeting | Frequency | Duration | Attendees |
|---------|-----------|----------|-----------|
| Daily Standup | Daily | 15 min | Dev Team |
| Sprint Planning | Bi-weekly (Mon) | 2 hrs | All |
| Sprint Review | Bi-weekly (Fri) | 1 hr | All + Stakeholders |
| Sprint Retrospective | Bi-weekly (Fri) | 1 hr | Dev Team |
| Backlog Refinement | Weekly (Wed) | 1 hr | PM, Tech Lead, Design |
| Tech Sync | Weekly (Tue) | 30 min | Tech Lead, BE, FE, DevOps |
| Stakeholder Demo | Monthly | 1 hr | PM, Stakeholders |

---

## 8. Tools & Environments

| Category | Tool |
|----------|------|
| **Version Control** | GitHub (Monorepo) |
| **Project Management** | GitHub Projects / Jira |
| **CI/CD** | GitHub Actions |
| **Package Manager** | pnpm (Workspaces) |
| **Build Tool** | Turborepo |
| **Frontend** | Vite, React 18, TypeScript, Tailwind CSS, Shadcn/UI, TanStack Query, React Router, React Hook Form, Zod, Tiptap, Recharts |
| **Backend** | Node.js 20, Express, TypeScript, Knex.js, MySQL2, JWT, Bcrypt, Zod, Multer, Sharp, ioredis, Winston, Helmet, express-rate-limit |
| **Database** | MySQL 8.0 (Primary), Redis 7 (Cache/Sessions) |
| **Testing** | Vitest (Unit), Supertest (Integration), Playwright (E2E) |
| **Code Quality** | ESLint, Prettier, TypeScript Strict, Husky, lint-staged, Commitlint |
| **Documentation** | Swagger/OpenAPI (API), Storybook (Components - Optional), Markdown (Architecture) |
| **Monitoring** | PM2 (Process), Nginx (Reverse Proxy), Uptime Kuma / Prometheus + Grafana (Future) |
| **Deployment** | Docker, Docker Compose (Staging), Kubernetes / Coolify / Portainer (Prod - Future) |

---

## 9. Budget & Resource Estimation (Indicative)

| Resource | Monthly Cost (Est.) | Duration | Total |
|----------|---------------------|----------|-------|
| **Personnel (6 FTE)** | IDR 150-250jt/FTE | 3 Months | IDR 2.7 - 4.5 M |
| **Cloud Infrastructure (Staging + Prod)** | IDR 5-10jt | 3 Months | IDR 15-30 jt |
| **Domain + SSL** | IDR 500rb - 2jt | Annual | IDR 0.5-2 jt |
| **Third-party Services (Email, Maps, CDN)** | IDR 1-3jt | 3 Months | IDR 3-9 jt |
| **Contingency (15%)** | - | - | ~15% |
| **TOTAL ESTIMATE** | | | **IDR 3.1 - 5.2 M** |

*Note: Actual costs depend on team rates, cloud provider, and scale.*

---

## 10. Success Metrics (KPIs)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Launch Date** | On Schedule (Week 15) | Project Plan vs Actual |
| **Performance (Lighthouse Mobile)** | > 90 (Perf, A11y, Best Practices, SEO) | Lighthouse CI |
| **API Latency (p95)** | < 200ms (Simple), < 500ms (Complex) | Load Test / APM |
| **Uptime** | 99.9% | Uptime Monitor |
| **Bug Escape Rate** | < 5% (Critical/High in Prod) | Bug Tracker |
| **Test Coverage** | > 70% (Backend), > 50% (Frontend Components) | Coverage Reports |
| **User Satisfaction (Admin)** | > 4.5/5 | Post-Launch Survey |
| **PPDB Online Submission Rate** | > 80% of Total | Analytics |
| **Content Publish Time** | < 2 Minutes (Draft to Live) | Observation |

---

## 11. Post-Launch Roadmap (Phase 2+)

| Feature | Priority | Effort | Description |
|---------|----------|--------|-------------|
| **Next.js Migration (SSR/ISR)** | High | Large | Better SEO, Performance, Preview Mode |
| **Real-time Notifications (WebSocket)** | Medium | Medium | New PPDB, Contact Form, Content Updates |
| **Advanced Analytics Dashboard** | Medium | Medium | Visitor Demographics, Heatmaps, Funnel |
| **Multi-language (EN/ID)** | Low | Medium | i18n Routing, Content Translation |
| **Alumni Portal** | Low | Large | Directory, Tracer Study, Donation |
| **E-Learning Integration (Moodle/LMS)** | Low | Large | SSO, Course Catalog, Grades |
| **Mobile App (React Native/Flutter)** | Low | Large | Native Experience, Push Notifications |
| **AI Content Assistant** | Low | Medium | Auto-summarize, SEO Suggestions, Image Alt Gen |

---

*Document Version: 1.0*
*Last Updated: 2026-07-19*
*Author: Project Management Office*
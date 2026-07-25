# Product Requirement Document (PRD)
# SMK Teknologi Plus - Website & Admin Dashboard

---

## 1. Product Overview

**Product Name:** SMK Teknologi Plus - Website & Admin Dashboard
**Product Type:** Website Sekolah + Admin Dashboard (Monorepo: React + Node.js/Express)
**Target Users:**
- **External:** Siswa, Orang Tua, Calon Siswa (PPDB), Umum
- **Internal:** Admin Sekolah, Kepala Sekolah, Guru, Staff TU

**Objective:** Membangun website sekolah modern, responsif, dan mudah dikelola melalui dashboard admin terpusat. Website menampilkan profil sekolah, informasi akademik, berita, pengumuman, agenda, prestasi, PPDB, dan fasilitas.

---

## 2. Scope

### In Scope (MVP - Phase 1)
- **Public Website (Frontend React):**
  - Home, Profil, Akademik, Informasi, PPDB, Lainnya
  - SEO-friendly, Mobile-first, Responsive
  - SSR/SSG tidak diwajibkan (CSR acceptable for MVP), optimasi meta tags
- **Admin Dashboard (Frontend React + Protected Routes):**
  - Authentication (Login/Logout, JWT, Role-based)
  - Dashboard Statistik
  - CRUD: User, Guru, Jurusan, Berita, Pengumuman, Agenda, Prestasi, Galeri, Hero Slider, PPDB, Download, Setting Website
- **Backend API (Node.js/Express + MySQL):**
  - RESTful API
  - JWT Authentication + Role Based Access Control (RBAC)
  - File Upload (Image/Document)
  - Database Migration & Seeder

### Out of Scope (Phase 1)
- Multi-tenancy / Multi-school
- E-learning / LMS
- Payment Gateway PPDB
- Mobile App (Native/Flutter)
- Real-time Notification (WebSocket)
- CMS Headless / Page Builder
- SSO / SSO Google/Microsoft

---

## 3. User Roles & Permissions (RBAC)

| Role | Description | Access Level |
|------|-------------|--------------|
| **Super Admin** | Developer / Super Administrator | Full Access (All CRUD + User Management + Settings) |
| **Admin** | Staff TU / Admin Website | CRUD Content (Berita, Pengumuman, Agenda, Prestasi, Galeri, Guru, Jurusan, PPDB, Download, Hero Slider), View Dashboard |
| **Editor** | Guru / Staff Pengelola Konten | CRUD Berita, Pengumuman, Agenda, Prestasi (Own Content), Upload Galeri |
| **Viewer** | Kepala Sekolah / Stakeholder | View Dashboard (Read-only) |

**Permission Matrix (MVP):**

| Feature | Super Admin | Admin | Editor | Viewer |
|---------|-------------|-------|--------|--------|
| User Management | CRUD | Read | - | - |
| Website Settings | CRUD | Read | - | - |
| Hero Slider | CRUD | CRUD | - | - |
| Guru & Jurusan | CRUD | CRUD | Read | Read |
| Berita | CRUD | CRUD | CRUD (Own) | Read |
| Pengumuman | CRUD | CRUD | CRUD (Own) | Read |
| Agenda | CRUD | CRUD | CRUD (Own) | Read |
| Prestasi | CRUD | CRUD | CRUD (Own) | Read |
| Galeri | CRUD | CRUD | Create, Read (Own) | Read |
| PPDB | CRUD | CRUD | Read | Read |
| Download | CRUD | CRUD | Create, Read | Read |

---

## 4. Functional Requirements

### 4.1 Public Website (Frontend)

#### 4.1.1 Home Page
- **Hero Slider** (Max 5 slide, auto-slide, navigation dots/arrows, CTA button ke PPDB/Berita)
- **Sambutan Kepala Sekolah** (Foto, Nama, Sambutan singkat, Link "Baca Selengkapnya")
- **Statistik Sekolah** (Counter animasi: Siswa, Guru, Jurusan, Prestasi)
- **Berita Terbaru** (Grid 3 kolom, load more / pagination, kategori badge)
- **Prestasi Terbaru** (Carousel/Grid 3 item)
- **Agenda Terdekat** (List 5 agenda terdekat)
- **Galeri Foto** (Masonry grid, lightbox)
- **Footer**: Profil singkat, Link cepat, Kontak, Maps, Sosmed, Copyright

#### 4.1.2 Profil Sekolah
- **Tentang Sekolah** (Sejarah singkat, Visi & Misi dengan ikon, Tujuan)
- **Struktur Organisasi** (Tree/Chart: Kepsek, Wakasek, Ka. Jurusan, Guru, Staff)
- **Sejarah Sekolah** (Timeline vertikal)
- **Fasilitas** (Grid card: Lab, Perpustakaan, Lapangan, Mosque, Kantin, Parkiran)

#### 4.1.3 Akademik
- **Jurusan** (Grid card: Nama, Singkatan, Deskripsi singkat, Link detail)
  - **Detail Jurusan**: Visi Misi Jurusan, Kompetensi Keahlian, Kurikulum, Prospek Karir, Guru Pembimbing, Galeri Kegiatan
- **Guru & Staff** (Grid/Table: Foto, Nama, NIP, Jabatan, Jurusan, Kontak)
- **Ekstrakurikuler** (Card: Nama, Pembina, Jam, Deskripsi, Foto Kegiatan)
- **Kalender Akademik** (View Kalender/Table: Bulan, Kegiatan, Tanggal)

#### 4.1.4 Informasi
- **Berita** (List + Pagination + Kategori + Search, Detail: Hero Image, Content Rich Text, Tags, Share Sosmed, Related News)
- **Pengumuman** (List + Priority Badge: Penting/Biasa, Detail)
- **Agenda** (List/Calendar View: Tanggal, Judul, Tempat, Deskripsi, Status: Akan Datang/Selesai)
- **Prestasi** (Grid: Thumbnail, Judul, Tingkat, Tahun, Juara, Deskripsi)

#### 4.1.5 PPDB (Penerimaan Peserta Didik Baru)
- **Informasi PPDB** (Jalur: Zonasi, Afirmasi, Prestasi, Perpindahan; Jadwal; Persyaratan; Alur Pendaftaran)
- **Formulir Pendaftaran Online** (Multi-step Form: Data Pribadi, Data Orang Tua, Data Sekolah Asal, Upload Berkas, Review & Submit)
- **Cek Status Pendaftaran** (Input No. Pendaftaran + NISN → Status: Diterima/Cadangan/Tidak Lulus + Info Selanjutnya)
- **Pengumuman PPDB** (List pengumuman khusus PPDB)

#### 4.1.6 Lainnya
- **Download** (Kategori: Formulir, Dokumen, Kurikulum, Lainnya; Table: Nama, Kategori, Ukuran, Unduh)
- **FAQ** (Accordion: Kategori Umum, PPDB, Akademik, Lainnya)
- **Kontak** (Form Kontak: Nama, Email, Subjek, Pesan → Kirim Email/Simpan DB + Google Maps Embed + Info Kontak Sekolah)
- **Galeri** (Filter Kategori: Kegiatan, Fasilitas, Prestasi, Lainnya; Lightbox/Modal)

---

### 4.2 Admin Dashboard (Frontend)

#### 4.2.1 Authentication
- **Login Page**: Email/Username + Password + Remember Me + Captcha (optional)
- **JWT Token**: Access Token (Short-lived, 15m) + Refresh Token (Long-lived, 7d, HttpOnly Cookie)
- **Protected Routes**: Redirect to Login if unauthenticated
- **Role-based Redirect**: Super Admin → User Management, Admin/Editor → Dashboard
- **Logout**: Clear tokens, redirect to login

#### 4.2.2 Layout
- **Sidebar** (Collapsible): Logo, Menu Items (Grouped), User Profile Dropdown
- **Topbar**: Breadcrumb, Search Global (Cmd+K), Notification Bell, Theme Toggle, User Avatar
- **Footer**: Version, Copyright

#### 4.2.3 Dashboard (Home)
- **Stat Cards**: Total Guru, Total Berita, Total Pengunjung (Hari ini/Bulan ini), Total PPDB Pending
- **Chart**: Pengunjung 7 Hari Terakhir (Line Chart), Berita per Kategori (Donut Chart)
- **Recent Activity**: 5 Aktivitas Terakhir (User login, Create/Update/Delete content)
- **Quick Actions**: Tambah Berita, Tambah Guru, Kelola PPDB

#### 4.2.4 Master Data Management
| Module | Fields | Actions |
|--------|--------|---------|
| **User Management** (Super Admin only) | ID, Nama, Email, Username, Role, Status (Aktif/Nonaktif), Foto, Last Login | CRUD, Reset Password, Assign Role |
| **Guru & Staff** | NIP/NIK, Nama, Jenis Kelamin, Tempat/Tgl Lahir, Alamat, Telepon, Email, Foto, Jabatan, Jurusan, Status (Aktif/Pensiun), Urutan Tampil | CRUD, Bulk Import CSV, Export Excel/PDF |
| **Jurusan** | Kode, Nama, Singkatan, Deskripsi, Visi Misi, Kompetensi Keahlian, Kurikulum, Prospek Karir, Foto Header, Guru Koordinator, Status Aktif, Urutan | CRUD, Reorder Drag-drop |
| **Ekstrakurikuler** | Nama, Pembina, Deskripsi, Jam Pelaksanaan, Foto, Status Aktif | CRUD |

#### 4.2.5 Content Management
| Module | Fields | Features |
|--------|--------|----------|
| **Hero Slider** | Judul, Subjudul, Gambar (Desktop/Mobile), Link CTA, Teks Tombol, Urutan, Status Aktif, Tanggal Mulai/Berakhir | CRUD, Drag-drop Reorder, Preview |
| **Berita** | Judul, Slug (Auto), Kategori, Thumbnail, Konten (Rich Text Editor: TinyMCE/Tiptap), Tags, Status (Draft/Publish/Arsip), Tanggal Publish, Penulis, Meta SEO (Title, Desc, OG Image) | CRUD, Bulk Action (Publish/Archive/Delete), Filter & Search, Preview, Schedule Publish |
| **Pengumuman** | Judul, Konten (Rich Text), Prioritas (Tinggi/Sedang/Rendah), Tanggal Mulai, Tanggal Berakhir, Status Aktif | CRUD, Pin to Top |
| **Agenda** | Judul, Deskripsi, Tempat, Tanggal Mulai, Tanggal Selesai, Waktu Mulai, Waktu Selesai, Status (Akan Datang/Sedang Berlangsung/Selesai), Gambar | CRUD, Calendar View |
| **Prestasi** | Judul, Tingkat (Sekolah/Kabupaten/Provinsi/Nasional/Internasional), Jenis (Akademik/Non-Akademik/Olahraga/Seni), Tahun, Juara, Deskripsi, Foto/Sertifikat, Siswa/Guru Terlibat | CRUD, Filter Tingkat & Jenis |
| **Galeri** | Judul, Kategori, Deskripsi, Gambar (Multiple Upload), Tanggal Kegiatan, Status Aktif | CRUD, Multiple Upload + Drag-drop Sort, Lightbox Preview |
| **Download** | Judul, Kategori, Deskripsi, File (PDF/DOC/XLS/ZIP), Ukuran File (Auto), Jumlah Unduh (Counter), Status Aktif | CRUD, File Upload Validation (Type, Size), Download Counter |
| **PPDB** | Tahun Ajaran, Kuota per Jurusan, Jadwal (Buka/Tutup per Jalur), Syarat & Ketentuan (Rich Text), Pengumuman Khusus | CRUD Tahun Ajaran, Set Kuota, Kelola Form Fields (Dynamic Form Builder - MVP: Static), Export Data Pendaftar (Excel/PDF) |
| **Pendaftar PPDB** | Data Lengkap Formulir, Status (Baru/Diverifikasi/Diterima/Cadangan/Ditolak), Catatan Verifikasi, Tanggal Verifikasi | List + Filter + Search, Detail + Verifikasi (Approve/Reject + Catatan), Bulk Export, Cetak Kartu Peserta |

#### 4.2.6 Pengaturan Website
- **Identitas Sekolah**: Nama, Singkatan, NPSN, NSM, Alamat, Telepon, Email, Website, Logo, Favicon
- **Media Sosial**: Facebook, Instagram, YouTube, TikTok, Twitter/X, WhatsApp
- **SEO Global**: Meta Title, Meta Description, Keywords, OG Image Default, Google Analytics ID, Search Console Verification
- **Footer**: Copyright Text, Link Cepat (Custom), Disclaimer
- **Maintenance Mode**: Toggle On/Off, Pesan Maintenance, Allowed Roles Bypass
- **Email Config**: SMTP Host, Port, Username, Password, From Name/Email (untuk Notifikasi PPDB, Kontak)

---

### 4.3 Backend API (Node.js/Express)

#### 4.3.1 Authentication & Authorization
- `POST /api/auth/login` - Login, return Access Token + Set Refresh Token Cookie
- `POST /api/auth/refresh` - Refresh Access Token
- `POST /api/auth/logout` - Clear Refresh Token Cookie
- `GET /api/auth/me` - Get Current User Profile
- **Middleware**: `authenticate` (verify JWT), `authorize(roles[])` (RBAC)

#### 4.3.2 API Resources (RESTful)
| Resource | Endpoints |
|----------|-----------|
| **Users** (Super Admin) | GET/POST /api/users, GET/PUT/DELETE /api/users/:id, PUT /api/users/:id/password, PUT /api/users/:id/role |
| **Guru** | GET/POST /api/guru, GET/PUT/DELETE /api/guru/:id, GET /api/guru/jurusan/:jurusanId |
| **Jurusan** | GET/POST /api/jurusan, GET/PUT/DELETE /api/jurusan/:id, PUT /api/jurusan/reorder |
| **Ekstrakurikuler** | GET/POST /api/ekstrakurikuler, GET/PUT/DELETE /api/ekstrakurikuler/:id |
| **Hero Slider** | GET/POST /api/hero-slider, GET/PUT/DELETE /api/hero-slider/:id, PUT /api/hero-slider/reorder |
| **Berita** | GET/POST /api/berita, GET/PUT/DELETE /api/berita/:id, GET /api/berita/slug/:slug, PUT /api/berita/:id/publish |
| **Pengumuman** | GET/POST /api/pengumuman, GET/PUT/DELETE /api/pengumuman/:id |
| **Agenda** | GET/POST /api/agenda, GET/PUT/DELETE /api/agenda/:id |
| **Prestasi** | GET/POST /api/prestasi, GET/PUT/DELETE /api/prestasi/:id |
| **Galeri** | GET/POST /api/galeri, GET/PUT/DELETE /api/galeri/:id, POST /api/galeri/:id/upload (multiple) |
| **Download** | GET/POST /api/download, GET/PUT/DELETE /api/download/:id, GET /api/download/:id/file (track download count) |
| **PPDB** | GET/POST /api/ppdb/tahun-ajaran, GET/PUT/DELETE /api/ppdb/tahun-ajaran/:id, GET/POST /api/ppdb/pendaftar, GET/PUT /api/ppdb/pendaftar/:id, PUT /api/ppdb/pendaftar/:id/verifikasi, GET /api/ppdb/pendaftar/export |
| **Setting** | GET /api/setting, PUT /api/setting |
| **Upload** | POST /api/upload/image (single), POST /api/upload/images (multiple), POST /api/upload/file |
| **Public Stats** | GET /api/public/stats (counter), POST /api/public/visit (track visitor) |

#### 4.3.3 File Upload
- **Storage**: Local filesystem (MVP) / S3 Compatible (Future)
- **Path Structure**: `/uploads/{images|files}/{year}/{month}/{uuid}.{ext}`
- **Validation**: Mime type, Max size (Image: 2MB, File: 10MB), Filename sanitization
- **Image Processing**: Sharp (Resize: Thumbnail 400px, Medium 800px, Original; WebP conversion)

#### 4.3.4 Database
- **Engine**: MySQL 8.0+ (InnoDB)
- **ORM/Query Builder**: Knex.js / Prisma ORM (Decision: **Knex.js** for flexibility & performance)
- **Migrations**: Versioned SQL files
- **Seeders**: Initial data (Super Admin, Settings, Sample Data)

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **Frontend**: LCP < 2.5s, FCP < 1.8s, CLS < 0.1, TBT < 200ms (Lighthouse Mobile > 90)
- **API Response**: < 200ms (p95) for simple GET, < 500ms for complex queries
- **Image Optimization**: WebP, Lazy Loading, Responsive Images (srcset), Blur Placeholder
- **Caching**: Redis untuk API Public (Berita, Pengumuman, Agenda, Slider) - TTL 5 menit

### 5.2 Security
- **Authentication**: JWT (RS256), HttpOnly Secure Cookie untuk Refresh Token, Access Token di Memory/State
- **Password**: Bcrypt (Cost 12)
- **Rate Limiting**: Login 5 req/min, API 100 req/min per IP
- **CORS**: Whitelist domain production
- **Helmet**: Security Headers (CSP, HSTS, X-Frame-Options, etc.)
- **Input Validation**: Zod/Joi di semua endpoint
- **SQL Injection**: Parameterized Queries (Knex)
- **File Upload**: Validasi MIME + Extension, Rename file, Store outside public root
- **XSS Prevention**: Sanitasi Rich Text (DOMPurify), Output Encoding

### 5.3 Scalability
- **Stateless Backend**: Horizontal scaling ready
- **Database**: Read Replica ready (Future)
- **File Storage**: S3 Compatible ready (Future)
- **Caching**: Redis Cluster ready

### 5.4 Accessibility (a11y)
- WCAG 2.1 Level AA
- Semantic HTML, ARIA Labels, Focus Visible, Color Contrast, Keyboard Navigation, Alt Text

### 5.5 SEO
- Server-side Meta Tags (React Helmet Async)
- Sitemap.xml & Robots.txt (Generate via Script/SSR)
- Structured Data (JSON-LD: Organization, WebSite, Article, Event, Course)
- Canonical URLs, Open Graph, Twitter Cards
- Clean URLs (Slug-based), No Hash Routing

### 5.6 Browser Support
- Chrome, Firefox, Safari, Edge (Latest 2 Versions)
- Mobile: iOS Safari, Chrome Android (Latest 2 Versions)

---

## 6. UI/UX Requirements

### 6.1 Design System
- **Color Palette**: Primary (Brand Blue #1E40AF), Secondary (Gold #F59E0B), Neutral (Gray Scale), Semantic (Success, Warning, Error, Info)
- **Typography**: Inter (UI), Merriweather/Playfair Display (Serif Headlines - Optional)
- **Spacing**: 4px Base Unit (4, 8, 12, 16, 24, 32, 48, 64)
- **Border Radius**: 4px (sm), 8px (md), 12px (lg), 9999px (full)
- **Shadows**: 3 Levels (sm, md, lg)
- **Icons**: Lucide React / Heroicons (Outline)

### 6.2 Responsive Breakpoints
| Breakpoint | Size | Target |
|------------|------|--------|
| Mobile | < 640px | Smartphone |
| Tablet | 640px - 1023px | Tablet Portrait |
| Desktop | 1024px - 1279px | Laptop |
| Large Desktop | >= 1280px | Desktop Monitor |

### 6.3 Component Library (Shadcn/UI + Tailwind CSS)
- Button, Input, Textarea, Select, Checkbox, Radio, Switch
- Card, Table, Modal/Dialog, Dropdown, Tabs, Accordion
- Toast/Sonner, Tooltip, Popover, Avatar, Badge, Breadcrumb
- Pagination, DataTable (TanStack Table), DatePicker
- Rich Text Editor (Tiptap), Image Upload Zone

---

## 7. Technical Stack Summary

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend** | React | 18.x |
| | Vite | 5.x |
| | Tailwind CSS | 3.x |
| | Shadcn/UI | Latest |
| | React Router | 6.x |
| | TanStack Query | 5.x |
| | Axios | 1.x |
| | Zustand / Context | State Management |
| | Tiptap | Rich Text Editor |
| | Chart.js / Recharts | Charts |
| | React Hook Form + Zod | Form Validation |
| | Lucide React | Icons |
| **Backend** | Node.js | 20.x LTS |
| | Express.js | 4.x |
| | Knex.js | 3.x |
| | MySQL2 | 3.x |
| | JWT (jsonwebtoken) | 9.x |
| | Bcryptjs | 2.x |
| | Zod | 3.x |
| | Multer | 1.x |
| | Sharp | 0.33.x |
| | Helmet, CORS, Compression, Morgan | Standard |
| | Nodemon | Dev |
| **Database** | MySQL | 8.0+ |
| **DevOps** | Git, GitHub Actions | CI/CD |
| | Docker (Optional) | Containerization |
| | PM2 / Systemd | Process Manager |

---

## 8. Acceptance Criteria (Definition of Done)

### 8.1 Public Website
- [ ] Semua halaman publik render tanpa error (Console Clean)
- [ ] Responsive di 4 breakpoint utama
- [ ] Lighthouse Performance > 90 (Mobile)
- [ ] SEO Meta Tags lengkap di semua halaman
- [ ] Form Kontak & PPDB terkirim & tersimpan di DB
- [ ] Cek Status PPDB berfungsi (Input No. Daftar + NISN)
- [ ] Gambar Hero Slider auto-slide, navigasi berfungsi
- [ ] Lightbox Galeri berfungsi (Keyboard Nav, Swipe Mobile)
- [ ] Download counter bertambah saat file diunduh

### 8.2 Admin Dashboard
- [ ] Login/Logout/Refresh Token berfungsi (HttpOnly Cookie)
- [ ] RBAC: Super Admin akses User Management, Editor tidak akses
- [ ] CRUD Master Data (Guru, Jurusan, Ekstrakurikuler) lengkap validasi
- [ ] CRUD Content (Berita, Pengumuman, Agenda, Prestasi, Galeri, Download, Slider) lengkap
- [ ] Rich Text Editor (Tiptap) berfungsi: Heading, List, Image, Table, Link, Code Block
- [ ] Image Upload: Preview, Resize, WebP, Multiple, Drag-drop Reorder
- [ ] PPDB: Kelola Tahun Ajaran, Kuota, Verifikasi Pendaftar, Export Excel
- [ ] Setting Website: Simpan & Tampil di Frontend
- [ ] Dashboard Stats & Chart render benar

### 8.3 Backend API
- [ ] Semua endpoint RESTful mengikuti konvensi
- [ ] Validasi Input (Zod) di semua endpoint POST/PUT
- [ ] Error Handling Konsisten (Format: { success, message, data, errors })
- [ ] Pagination & Filter & Search di List Endpoint
- [ ] File Upload Validasi & Proses Sharp berjalan
- [ ] Migration & Seeder jalan tanpa error
- [ ] Unit Test Coverage > 70% (Critical Path: Auth, PPDB Verifikasi, Upload)

---

## 9. Timeline & Milestones (Estimasi)

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 0: Setup & Config** | 3 Hari | Monorepo, Vite+React, Express, MySQL, Tailwind, Shadcn, Knex, ESLint/Prettier, Husky, CI/CD Pipeline |
| **Phase 1: Auth & Core Backend** | 5 Hari | JWT Auth, RBAC Middleware, User CRUD, Migration & Seeder, File Upload Service, Error Handling, API Docs (Swagger) |
| **Phase 2: Master Data API & Admin UI** | 7 Hari | Guru, Jurusan, Ekstrakurikuler API + Admin CRUD Pages, Sidebar, Layout, Table Components |
| **Phase 3: Content Management API & Admin UI** | 10 Hari | Berita, Pengumuman, Agenda, Prestasi, Galeri, Download, Hero Slider API + Admin CRUD + Rich Text Editor + Image Upload |
| **Phase 4: PPDB Module** | 7 Hari | Tahun Ajaran, Form Pendaftaran (Public), Verifikasi (Admin), Export, Cek Status |
| **Phase 5: Public Website Frontend** | 10 Hari | Home, Profil, Akademik, Informasi, PPDB, Lainnya, SEO, Responsive, Performance |
| **Phase 6: Integration & Polish** | 5 Hari | Connect Frontend-Backend, E2E Testing, Bug Fix, Optimization, Documentation |
| **Phase 7: Deployment & Handover** | 3 Hari | Production Deploy, SSL, Domain, Monitoring, Backup Strategy, Documentation Handover |
| **TOTAL** | **~50 Hari (10 Minggu)** | |

---

## 10. Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Perubahan Requirement Major di Tengah Project | Tinggi | Tinggi | Agile Sprint 2 Minggu, Review Sprint, Change Request Formal |
| Keterlambatan Design/UI dari Stakeholder | Tinggi | Sedang | Gunakan Design System Default (Shadcn) dulu, Refine nanti |
| Performa Database Query Kompleks (Search/Filter) | Sedang | Sedang | Indexing Strategy, Query Optimization, Pagination Wajib |
| Upload File Besar / Banyak (Galeri) | Sedang | Sedang | Chunked Upload (Future), Sharp Resize, Queue (BullMQ - Future) |
| Keamanan Upload File (Shell Upload) | Rendah | Tinggi | Validasi MIME + Extension, Rename File, Disable Exec di Folder Upload, Virus Scan (ClamAV - Future) |
| Browser Compatibility (Safari/iOS) | Rendah | Sedang | Test di BrowserStack/Device Real, Polyfill Target Browserslist |

---

## 11. Success Metrics (KPI)

| Metric | Target |
|--------|--------|
| Website Uptime | 99.9% |
| Page Load Time (Mobile) | < 3s |
| Admin Dashboard Load Time | < 2s |
| API Error Rate | < 0.1% |
| PPDB Online Submission Success Rate | 99% |
| Content Publish Time (Admin) | < 2 Menit |
| Security Incidents | 0 Critical |

---

## 12. Appendix

### 12.1 Glosarium
- **PPDB**: Penerimaan Peserta Didik Baru
- **RBAC**: Role-Based Access Control
- **JWT**: JSON Web Token
- **SSR/SSG/CSR**: Server-Side Rendering / Static Site Generation / Client-Side Rendering
- **LCP/FCP/CLS/TBT**: Core Web Vitals Metrics
- **WYSIWYG**: What You See Is What You Get

### 12.2 Referensi
- [Kemdikbud PPDB Guidelines](https://ppdb.kemdikbud.go.id/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

*Document Version: 1.0*
*Last Updated: 2026-07-19*
*Author: Product Team*
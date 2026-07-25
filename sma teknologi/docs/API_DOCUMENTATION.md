# API Documentation
# SMK Teknologi Plus - Website & Admin Dashboard

---

## 1. Overview

**Base URL**: `https://api.smktekplus.sch.id/api/v1` (Production)  
**Base URL (Dev)**: `http://localhost:3000/api/v1`  
**Protocol**: HTTPS (Production), HTTP (Development)  
**Format**: JSON  
**Authentication**: JWT Bearer Token (Access Token) + HttpOnly Cookie (Refresh Token)  
**Versioning**: URL Path (`/api/v1/`)

---

## 2. Authentication

### 2.1 Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@smktekplus.sch.id",
  "password": "securePassword123",
  "rememberMe": true
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "Admin Sekolah",
      "email": "admin@smktekplus.sch.id",
      "role": "super_admin",
      "avatar": null
    },
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900
  }
}
```
**Cookies Set**: `refreshToken` (HttpOnly, Secure, SameSite=Strict, Max-Age=7d)

### 2.2 Refresh Access Token
```http
POST /auth/refresh
Cookie: refreshToken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900
  }
}
```
**Cookies Set**: New `refreshToken` (Rotation), Old token blacklisted.

### 2.3 Logout
```http
POST /auth/logout
Cookie: refreshToken=...
Authorization: Bearer <access_token>
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```
**Cookies Cleared**: `refreshToken`

### 2.4 Get Current User Profile
```http
GET /auth/me
Authorization: Bearer <access_token>
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Admin Sekolah",
    "email": "admin@smktekplus.sch.id",
    "username": "admin",
    "role": "super_admin",
    "avatar": null,
    "phone": "08123456789",
    "lastLoginAt": "2026-07-19T10:30:00.000Z",
    "permissions": ["users:read", "users:write", "settings:write", ...]
  }
}
```

---

## 3. Standard Response Format

### 3.1 Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... } | [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### 3.2 Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email format" },
    { "field": "password", "message": "Password must be at least 8 characters" }
  ],
  "timestamp": "2026-07-19T10:30:00.000Z",
  "path": "/api/v1/auth/login"
}
```

### 3.3 HTTP Status Codes
| Code | Description |
|------|-------------|
| 200 | OK (GET, PUT, PATCH) |
| 201 | Created (POST) |
| 204 | No Content (DELETE) |
| 400 | Bad Request (Validation Error) |
| 401 | Unauthorized (Invalid/Expired Token) |
| 403 | Forbidden (Insufficient Role/Permission) |
| 404 | Not Found |
| 409 | Conflict (Duplicate Unique) |
| 422 | Unprocessable Entity (Business Logic Error) |
| 429 | Too Many Requests (Rate Limited) |
| 500 | Internal Server Error |

---

## 4. Pagination & Filtering (Standard)

### Query Parameters
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | integer | 1 | Page number (≥1) |
| `limit` | integer | 10 | Items per page (1-100) |
| `search` | string | - | Global search (fields defined per endpoint) |
| `sort_by` | string | `created_at` | Sort field |
| `sort_order` | enum | `desc` | `asc` or `desc` |
| `status` | string | - | Filter by status (if applicable) |
| `category_id` | uuid | - | Filter by category (if applicable) |
| `date_from` | date | - | Filter created_at ≥ date (YYYY-MM-DD) |
| `date_to` | date | - | Filter created_at ≤ date (YYYY-MM-DD) |

---

## 5. Public API Endpoints (No Auth Required)

### 5.1 Website Settings
```http
GET /public/settings
```
**Response**: `{ school_name, logo, favicon, social_media, seo, footer, maintenance_mode }`

### 5.2 Hero Slider
```http
GET /public/hero-slider
```
**Query**: `limit` (default 5)  
**Response**: `[{ id, title, subtitle, image_desktop, image_mobile, cta_text, cta_link, position, overlay_opacity }]`

### 5.3 Statistics Counter
```http
GET /public/stats
```
**Response**: `{ total_students, total_teachers, total_departments, total_achievements }`

### 5.4 Track Visit
```http
POST /public/visit
Content-Type: application/json
{ "page": "/", "referrer": "https://google.com" }
```

---

### 5.5 News (Berita)
```http
GET /public/berita
```
**Query**: Pagination + `category_id`, `tags`, `featured` (boolean)  
**Response**: Paginated list with `category` object.

```http
GET /public/berita/:slug
```
**Response**: Full article with `author`, `category`, `related_news` (3 items).

### 5.6 Announcements (Pengumuman)
```http
GET /public/pengumuman
```
**Query**: Pagination + `priority` (high/medium/low)  
**Response**: Active announcements within date range.

### 5.7 Events (Agenda)
```http
GET /public/agenda
```
**Query**: Pagination + `status` (upcoming/ongoing/completed), `month` (YYYY-MM)  
**Response**: Events with computed status.

```http
GET /public/agenda/calendar
```
**Query**: `year`, `month`  
**Response**: `{ year, month, events: [{ date, events: [...] }] }`

### 5.8 Achievements (Prestasi)
```http
GET /public/prestasi
```
**Query**: Pagination + `tingkat`, `jenis`, `tahun`  
**Response**: List with filter options.

### 5.9 Gallery (Galeri)
```http
GET /public/galeri
```
**Query**: Pagination + `category_id`  
**Response**: Items with `images` array (thumbnail, medium, original).

```http
GET /public/galeri/categories
```
**Response**: All active gallery categories.

### 5.10 Departments (Jurusan)
```http
GET /public/jurusan
```
**Response**: All active departments with `guru_koordinator` summary.

```http
GET /public/jurusan/:id
```
**Response**: Full detail (visi_misi, kompetensi, kurikulum, prospek_karir, guru_pembimbing, galeri).

### 5.11 Teachers (Guru)
```http
GET /public/guru
```
**Query**: Pagination + `jurusan_id`, `jabatan`  
**Response**: List with department name.

### 5.12 Extracurriculars (Ekstrakurikuler)
```http
GET /public/ekstrakurikuler
```
**Response**: Active list with pembina info.

### 5.13 Facilities (Fasilitas)
```http
GET /public/fasilitas
```
**Response**: Active facilities list.

### 5.14 Downloads
```http
GET /public/download
```
**Query**: Pagination + `category_id`  
**Response**: List with `download_count`, `file_size`, `file_type`.

```http
GET /public/download/:id/file
```
**Response**: File stream (increments download_count).  
**Headers**: `Content-Disposition: attachment; filename="..."`

### 5.15 FAQ
```http
GET /public/faq
```
**Query**: `category` (umum/ppdb/akademik/lainnya)  
**Response**: Grouped by category.

### 5.16 Contact Form
```http
POST /public/kontak
Content-Type: application/json
{
  "name": "Budi Santoso",
  "email": "budi@email.com",
  "subject": "Tanya PPDB",
  "message": "Apakah masih dibuka pendaftaran?"
}
```
**Response**: `{ success: true, message: "Pesan terkirim" }`

### 5.17 PPDB (Public)
```http
GET /public/ppdb/info
```
**Response**: Active Tahun Ajaran with `kuota` per jurusan, `syarat_ketentuan`, `jadwal`.

```http
POST /public/ppdb/daftar
Content-Type: multipart/form-data
```
**Fields**: All form fields (see PPDB Pendaftar schema) + `berkas` files (multiple: kk, akta, ijazah, Raport, Foto, dll)  
**Response**: `{ nomor_pendaftaran: "PPDB-2025-00001", message: "Pendaftaran berhasil" }`

```http
GET /public/ppdb/status
```
**Query**: `nomor_pendaftaran`, `nisn`  
**Response**: `{ status, catatan, tahapan_selanjutnya }`

---

## 6. Admin API Endpoints (Auth Required)

### 6.1 Headers
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### 6.2 Roles & Permissions Matrix
| Endpoint Group | Super Admin | Admin | Editor | Viewer |
|----------------|-------------|-------|--------|--------|
| Users | CRUD | R | - | - |
| Settings | CRUD | R | - | - |
| Hero Slider | CRUD | CRUD | - | R |
| Guru | CRUD | CRUD | R | R |
| Jurusan | CRUD | CRUD | R | R |
| Ekstrakurikuler | CRUD | CRUD | R | R |
| Berita | CRUD | CRUD | CRUD (Own) | R |
| Pengumuman | CRUD | CRUD | CRUD (Own) | R |
| Agenda | CRUD | CRUD | CRUD (Own) | R |
| Prestasi | CRUD | CRUD | CRUD (Own) | R |
| Galeri | CRUD | CRUD | C,R (Own) | R |
| Download | CRUD | CRUD | C,R | R |
| PPDB Tahun Ajaran | CRUD | CRUD | R | R |
| PPDB Pendaftar | R,U (Verifikasi) | R,U (Verifikasi) | R | R |
| Dashboard Stats | R | R | R | R |
| Activity Logs | R | R | - | - |

---

### 6.3 Dashboard
```http
GET /admin/dashboard/stats
```
**Response**:
```json
{
  "total_teachers": 45,
  "total_news": 120,
  "total_visitors_today": 1250,
  "total_visitors_month": 35000,
  "pending_ppdb": 15,
  "recent_activity": [
    { "action": "create", "model": "Berita", "model_id": "uuid", "user_name": "Editor 1", "created_at": "..." }
  ],
  "visitors_chart": [{ "date": "2026-07-13", "count": 1200 }, ...],
  "news_by_category": [{ "category": "Prestasi", "count": 25 }, ...]
}
```

---

### 6.4 User Management (Super Admin Only)
```http
GET /admin/users
```
**Query**: Pagination + `search`, `role_id`, `is_active`

```http
POST /admin/users
{
  "name": "New Admin",
  "email": "newadmin@school.id",
  "password": "TempPass123!",
  "role_id": "uuid-role-admin",
  "phone": "08123456789"
}
```

```http
GET /admin/users/:id
```

```http
PUT /admin/users/:id
{
  "name": "Updated Name",
  "phone": "08129876543",
  "is_active": true,
  "role_id": "uuid-role-editor"
}
```

```http
PUT /admin/users/:id/password
{
  "current_password": "oldpass",
  "new_password": "NewPass123!",
  "confirm_password": "NewPass123!"
}
```

```http
PUT /admin/users/:id/role
{
  "role_id": "uuid-role-admin"
}
```

```http
DELETE /admin/users/:id
```

---

### 6.5 Guru (Teachers)
```http
GET /admin/guru
```
**Query**: Pagination + `search`, `jurusan_id`, `status`, `jabatan`

```http
POST /admin/guru
{
  "nip_nik": "198001012005011001",
  "name": "Budi Santoso, S.Kom",
  "gender": "L",
  "birth_place": "Jakarta",
  "birth_date": "1980-01-01",
  "address": "Jl. Contoh No. 123",
  "phone": "08123456789",
  "email": "budi@school.id",
  "photo": "uuid-filename.webp",
  "position": "Guru TKJ",
  "jurusan_id": "uuid-jurusan-tkj",
  "status": "aktif",
  "order": 1
}
```

```http
GET /admin/guru/:id
```

```http
PUT /admin/guru/:id
```
**Body**: Partial update (same fields as POST)

```http
DELETE /admin/guru/:id
```

```http
POST /admin/guru/import
Content-Type: multipart/form-data
file: CSV/Excel
```
**Response**: `{ imported: 40, failed: 2, errors: [...] }`

```http
GET /admin/guru/export?format=xlsx
```
**Response**: Excel file download.

---

### 6.6 Jurusan (Departments)
```http
GET /admin/jurusan
```
**Query**: Pagination + `search`, `is_active`

```http
POST /admin/jurusan
{
  "code": "TKJ",
  "name": "Teknik Komputer dan Jaringan",
  "short_name": "TKJ",
  "description": "Deskripsi jurusan...",
  "vision_mission": { "vision": "...", "mission": ["...", "..."] },
  "competencies": "Kompetensi keahlian...",
  "curriculum": "Kurikulum...",
  "career_prospects": "Prospek karir...",
  "header_image": "uuid-filename.webp",
  "coordinator_id": "uuid-guru",
  "order": 1,
  "is_active": true
}
```

```http
GET /admin/jurusan/:id
```

```http
PUT /admin/jurusan/:id
```

```http
DELETE /admin/jurusan/:id
```

```http
PUT /admin/jurusan/reorder
{
  "items": [{ "id": "uuid-1", "order": 1 }, { "id": "uuid-2", "order": 2 }]
}
```

---

### 6.7 Ekstrakurikuler
```http
GET /admin/ekstrakurikuler
POST /admin/ekstrakurikuler
GET /admin/ekstrakurikuler/:id
PUT /admin/ekstrakurikuler/:id
DELETE /admin/ekstrakurikuler/:id
```
**Fields**: `name`, `supervisor_id` (guru), `description`, `schedule`, `photo`, `is_active`

---

### 6.8 Hero Slider
```http
GET /admin/hero-slider
POST /admin/hero-slider
GET /admin/hero-slider/:id
PUT /admin/hero-slider/:id
DELETE /admin/hero-slider/:id
PUT /admin/hero-slider/reorder
```
**Fields**: `title`, `subtitle`, `image_desktop`, `image_mobile`, `cta_text`, `cta_link`, `position` (left/center/right), `overlay_opacity` (0-100), `order`, `start_date`, `end_date`, `is_active`

**Image Upload**: See Upload API (returns processed URLs)

---

### 6.9 Berita (News)
```http
GET /admin/berita
```
**Query**: Pagination + `search`, `category_id`, `status` (draft/published/archived), `author_id`, `is_featured`, `date_from`, `date_to`

```http
POST /admin/berita
{
  "category_id": "uuid",
  "title": "Judul Berita",
  "excerpt": "Ringkasan singkat...",
  "content": "<h2>Konten HTML dari Tiptap</h2><p>...</p>",
  "thumbnail": "uuid-filename.webp",
  "tags": ["tag1", "tag2"],
  "meta_seo": { "title": "SEO Title", "description": "SEO Desc", "og_image": "uuid.webp" },
  "status": "draft",
  "published_at": null,
  "is_featured": false
}
```

```http
GET /admin/berita/:id
```

```http
PUT /admin/berita/:id
```

```http
PUT /admin/berita/:id/publish
```
**Body**: `{ "status": "published", "published_at": "2026-07-19T10:00:00Z" }` (optional, defaults to now)

```http
PUT /admin/berita/:id/archive
```

```http
DELETE /admin/berita/:id
```

```http
POST /admin/berita/bulk-action
{
  "ids": ["uuid-1", "uuid-2"],
  "action": "publish" | "archive" | "delete"
}
```

---

### 6.10 Pengumuman (Announcements)
```http
GET /admin/pengumuman
POST /admin/pengumuman
GET /admin/pengumuman/:id
PUT /admin/pengumuman/:id
DELETE /admin/pengumuman/:id
```
**Fields**: `title`, `content` (HTML), `priority` (low/medium/high), `start_date`, `end_date`, `is_pinned`, `is_active`

---

### 6.11 Agenda (Events)
```http
GET /admin/agenda
POST /admin/agenda
GET /admin/agenda/:id
PUT /admin/agenda/:id
DELETE /admin/agenda/:id
```
**Fields**: `title`, `description`, `location`, `start_date`, `end_date`, `start_time`, `end_time`, `image`, `status` (upcoming/ongoing/completed/cancelled), `is_active`

---

### 6.12 Prestasi (Achievements)
```http
GET /admin/prestasi
POST /admin/prestasi
GET /admin/prestasi/:id
PUT /admin/prestasi/:id
DELETE /admin/prestasi/:id
```
**Fields**: `title`, `level` (sekolah/kabupaten/provinsi/nasional/internasional), `type` (akademik/non_akademik/olahraga/seni/lainnya), `year`, `rank` (1/2/3/harapan_1/harapan_2/harapan_3/lainnya), `description`, `image`, `participants` (JSON: `[{name, nis_nip, role}]`), `is_active`

---

### 6.13 Galeri (Gallery)
```http
GET /admin/galeri
POST /admin/galeri
GET /admin/galeri/:id
PUT /admin/galeri/:id
DELETE /admin/galeri/:id
```
**Fields**: `category_id`, `title`, `description`, `images` (JSON array: `[{url, thumbnail, medium, alt, order}]`), `event_date`, `is_active`

```http
POST /admin/galeri/:id/upload
Content-Type: multipart/form-data
images: (multiple files)
```
**Response**: Processed image URLs added to `images` array.

---

### 6.14 Download
```http
GET /admin/download
POST /admin/download
GET /admin/download/:id
PUT /admin/download/:id
DELETE /admin/download/:id
```
**Fields**: `category_id`, `title`, `description`, `file` (upload), `is_active`

---

### 6.15 PPDB Management

#### Tahun Ajaran
```http
GET /admin/ppdb/tahun-ajaran
POST /admin/ppdb/tahun-ajaran
GET /admin/ppdb/tahun-ajaran/:id
PUT /admin/ppdb/tahun-ajaran/:id
DELETE /admin/ppdb/tahun-ajaran/:id
```
**Fields**: `academic_year` (2025/2026), `wave` (1/2/3), `total_quota`, `open_date`, `close_date`, `announcement_date`, `requirements` (HTML), `form_fields` (JSON - future), `is_active`

#### Kuota per Jurusan
```http
GET /admin/ppdb/tahun-ajaran/:id/kuota
PUT /admin/ppdb/tahun-ajaran/:id/kuota
```
**Body**: `[{ jurusan_id, quota_zonasi, quota_afirmasi, quota_prestasi, quota_perpindahan }]`

#### Pendaftar
```http
GET /admin/ppdb/pendaftar
```
**Query**: Pagination + `tahun_ajaran_id`, `status`, `jalur`, `jurusan_id`, `search` (nama/nisn/nomor)

```http
GET /admin/ppdb/pendaftar/:id
```
**Response**: Full applicant data + `berkas` array with verification status.

```http
PUT /admin/ppdb/pendaftar/:id/verifikasi
{
  "status": "diterima" | "cadangan" | "ditolak",
  "notes": "Catatan verifikasi..."
}
```

```http
GET /admin/ppdb/pendaftar/export
```
**Query**: `tahun_ajaran_id`, `format` (xlsx/csv)  
**Response**: File download.

---

### 6.16 Settings (Website Configuration)
```http
GET /admin/setting
```
**Response**: All settings grouped by `setting_group`.

```http
PUT /admin/setting
```
**Body**: `{ "school_name": "New Name", "meta_title": "...", "maintenance_mode": false, ... }` (Partial update)

```http
POST /admin/setting/upload
Content-Type: multipart/form-data
file: (logo, favicon, og_image, etc.)
```
**Response**: `{ key: "logo", url: "https://..." }`

---

### 6.17 File Upload
```http
POST /admin/upload/image
Content-Type: multipart/form-data
file: (single image)
folder: "berita" | "galeri" | "hero" | "guru" | "ppdb" | "download" | "setting" (default: "general")
```
**Response**:
```json
{
  "success": true,
  "data": {
    "original": "uploads/images/2026/07/uuid.webp",
    "thumbnail": "uploads/images/2026/07/uuid_thumb.webp",
    "medium": "uploads/images/2026/07/uuid_medium.webp",
    "width": 1920,
    "height": 1080,
    "size": 245000,
    "mime": "image/webp"
  }
}
```

```http
POST /admin/upload/images
Content-Type: multipart/form-data
files: (multiple images, max 10)
folder: "galeri"
```
**Response**: Array of above objects.

```http
POST /admin/upload/file
Content-Type: multipart/form-data
file: (pdf, doc, xls, zip - max 10MB)
folder: "download"
```
**Response**: `{ url, filename, size, mime }`

---

## 7. Validation Rules (Zod Schemas Summary)

### 7.1 Auth
- `email`: email, max 150
- `password`: min 8, max 100, regex (upper, lower, number, special)
- `rememberMe`: boolean

### 7.2 User
- `name`: string, min 2, max 150
- `email`: email, unique
- `username`: alphanumeric + underscore, 3-50, unique (optional)
- `password`: (on create) required, (on update) optional
- `role_id`: uuid, exists in roles
- `phone`: indonesian phone regex (optional)
- `is_active`: boolean

### 7.3 Guru
- `nip_nik`: string, max 30, unique (optional)
- `name`: string, min 2, max 150
- `gender`: enum ['L', 'P']
- `birth_date`: date, past
- `email`: email, unique (optional)
- `position`: string, max 100
- `jurusan_id`: uuid, exists (optional)
- `status`: enum ['aktif', 'pensiun', 'mutasi', 'non_aktif']
- `order`: integer ≥ 0

### 7.4 Jurusan
- `code`: string, max 10, uppercase, unique
- `name`: string, min 2, max 150
- `short_name`: string, max 20 (optional)
- `coordinator_id`: uuid, exists in guru (optional)
- `order`: integer ≥ 0

### 7.5 Berita
- `category_id`: uuid, exists in news_categories
- `title`: string, min 5, max 255
- `excerpt`: string, max 500 (optional)
- `content`: string, min 50 (HTML allowed, sanitized)
- `tags`: string[] (max 10, each max 50)
- `status`: enum ['draft', 'published', 'archived']
- `published_at`: ISO datetime (required if published)
- `is_featured`: boolean

### 7.6 PPDB Pendaftar (Public Form)
- `nisn`: string, 10 digits, unique per tahun_ajaran
- `nik`: string, 16 digits (optional)
- `nama_lengkap`: string, min 2, max 150
- `jenis_kelamin`: enum ['L', 'P']
- `tempat_lahir`: string, max 100
- `tanggal_lahir`: date, age 12-20
- `alamat`: string, min 10
- `asal_sekolah`: string, min 2
- `pilihan_1_id`: uuid, exists in jurusan
- `pilihan_2_id`: uuid, exists in jurusan (optional)
- `jalur`: enum ['zonasi', 'afirmasi', 'prestasi', 'perpindahan']
- `berkas`: file[] (required: kk, akta, ijazah, raport, foto; max 2MB each, allowed types)

---

## 8. Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/auth/login` | 5 requests | 1 minute |
| `/auth/refresh` | 10 requests | 1 minute |
| `/public/*` (GET) | 100 requests | 1 minute |
| `/public/kontak` (POST) | 3 requests | 1 hour |
| `/public/ppdb/daftar` (POST) | 1 request | 5 minutes (per IP) |
| `/admin/*` | 200 requests | 1 minute |
| `/admin/upload/*` | 20 requests | 1 minute |

**Headers Returned**:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

---

## 9. File Upload Specifications

### 9.1 Images
| Variant | Max Width | Format | Quality | Use Case |
|---------|-----------|--------|---------|----------|
| Thumbnail | 400px | WebP | 80% | Lists, Cards, Grid |
| Medium | 800px | WebP | 85% | Detail Pages, Modals |
| Original | 1920px | WebP | 90% | Fullscreen, Download |

**Allowed MIME**: `image/jpeg`, `image/png`, `image/webp`  
**Max Size**: 5MB (Original), Auto-resized if larger  
**Processing**: Sharp (Resize, WebP Convert, Metadata Strip, Progressive)

### 9.2 Documents
**Allowed MIME**: 
- `application/pdf`
- `application/msword`
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- `application/vnd.ms-excel`
- `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- `application/zip`

**Max Size**: 10MB  
**Storage**: Original format preserved, UUID filename.

---

## 10. Webhooks (Future / Optional)

| Event | Payload | Description |
|-------|---------|-------------|
| `ppdb.applicant.created` | `{ applicant_id, nomor_pendaftaran, nama, tahun_ajaran }` | New registration |
| `ppdb.applicant.verified` | `{ applicant_id, status, verified_by }` | Status changed |
| `content.published` | `{ model, id, title, url }` | Berita/Pengumuman/Agenda published |
| `user.login` | `{ user_id, ip, user_agent }` | Audit trail |

---

## 11. API Versioning & Deprecation

- **Current Version**: v1 (in URL)
- **Deprecation Policy**: 6 months notice via `Sunset` header + Developer Notification
- **Breaking Changes**: New version (v2) in URL, v1 maintained for 12 months

---

## 12. SDK / Client Libraries

### 12.1 Frontend (TypeScript)
```typescript
// services/api.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // For HttpOnly Cookie
});

// Interceptors for Auth Refresh
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      await refreshToken();
      return api(error.config);
    }
    return Promise.reject(error);
  }
);
```

### 12.2 React Query Hooks (TanStack Query)
```typescript
// hooks/useBerita.ts
export const useBerita = (params: BeritaParams) => 
  useQuery({
    queryKey: ['berita', params],
    queryFn: () => api.get('/public/berita', { params }).then(r => r.data.data)
  });

export const useCreateBerita = () =>
  useMutation({
    mutationFn: (data: BeritaForm) => api.post('/admin/berita', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['berita'] })
  });
```

---

*Document Version: 1.0*
*Last Updated: 2026-07-19*
*Author: Backend Team*
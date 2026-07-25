# Website Profil SMK Teknologi Plus

## Overview

Website profil sekolah modern, profesional, responsif, SEO Friendly, scalable, dan mudah dikembangkan untuk **SMK Teknologi Plus**.

Menggunakan arsitektur **Monorepo** dengan pemisahan jelas antara **Frontend (React.js)** dan **Backend (Node.js/Express.js)**.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js 18+, HTML5, CSS3 (Vanilla Modular CSS), Axios, React Router DOM |
| **Backend** | Node.js 18+, Express.js |
| **Database** | MySQL 8.0+ |
| **Version Control** | Git |
| **Package Manager** | npm / pnpm |
| **Development** | Vite (Frontend), Nodemon (Backend) |

---

## Project Structure (Monorepo)

```text
smk-teknologi-plus/
├── docs/                    # Dokumentasi proyek
├── frontend/                # React.js Application
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Images, fonts, static assets
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components (Public & Admin)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # React Context (Auth, Theme, etc.)
│   │   ├── services/        # API services (Axios instances)
│   │   ├── utils/           # Helper functions
│   │   ├── styles/          # Global & modular CSS
│   │   ├── routes/          # Route definitions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js/Express.js API
│   ├── src/
│   │   ├── config/          # Configuration files (DB, env)
│   │   ├── controllers/     # Request handlers
│   │   ├── middlewares/     # Express middlewares
│   │   ├── models/          # Database models / Query builders
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helper functions
│   │   ├── validators/      # Input validation schemas
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Entry point
│   ├── package.json
│   └── .env.example
├── database/
│   ├── migrations/          # SQL migration files
│   └── seeders/             # Seed data
├── .gitignore
├── package.json             # Root package.json (workspaces)
└── README.md
```

---

## Key Features

### Public Website
- **Home**: Hero Slider, Sambutan Kepala Sekolah, Berita Terbaru, Prestasi, Agenda, Statistik Sekolah
- **Profil**: Tentang Sekolah, Visi & Misi, Sejarah, Struktur Organisasi
- **Akademik**: Jurusan, Guru, Ekstrakurikuler, Fasilitas
- **Informasi**: Berita, Pengumuman, Agenda, Prestasi
- **PPDB**: Informasi Penerjaan Peserta Didik Baru
- **Lainnya**: Download, FAQ, Kontak, Google Maps

### Dashboard Admin
- **Autentikasi**: Login, Logout, Session Management
- **Dashboard**: Statistik ringkas (jumlah guru, berita, pengunjung, PPDB)
- **Manajemen Data**: User, Guru, Jurusan, Berita, Pengumuman, Agenda, Prestasi, Galeri, Hero Slider, PPDB, Download, Setting Website

---

## Getting Started

### Prerequisites
- Node.js >= 18.x
- MySQL >= 8.0
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd smk-teknologi-plus

# Install dependencies (root + workspaces)
npm install

# Setup environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your database credentials

# Run database migrations
cd backend && npm run migrate

# Seed initial data (optional)
cd backend && npm run seed

# Development mode (run both frontend & backend)
npm run dev

# Or run separately:
# Frontend: cd frontend && npm run dev
# Backend:  cd backend && npm run dev
```

### Build for Production

```bash
# Build frontend
cd frontend && npm run build

# Backend ready to run with: npm start
```

---

## Documentation

| File | Description |
|------|-------------|
| [PRD.md](./PRD.md) | Product Requirement Document |
| [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md) | System Architecture & Design |
| [DATABASE_ERD.md](./DATABASE_ERD.md) | Entity Relationship Diagram & Schema |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Detailed Folder Structure |
| [UI_UX.md](./UI_UX.md) | UI/UX Design Guidelines |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | REST API Specifications |
| [ROADMAP_CODING.md](./ROADMAP_CODING.md) | Implementation Roadmap |

---

## License

Internal Project - SMK Teknologi Plus
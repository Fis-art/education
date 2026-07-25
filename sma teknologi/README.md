# SMK Teknologi Plus

Website profil sekolah modern dengan arsitektur monorepo (React + Express).

## Quick Start
```bash
cd smk-teknologi-plus
pnpm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker compose up -d
pnpm db:migrate
pnpm dev
```

## Tech Stack
- Frontend: React 18, TypeScript, Vite, Tailwind CSS
- Backend: Node.js 20, Express, TypeScript
- Database: MySQL 8.0, Redis 7
- ORM: Knex + Objection.js
- Auth: JWT

## Scripts
- `pnpm dev` - Run frontend + backend
- `pnpm build` - Build all
- `pnpm db:migrate` - Run migrations
- `pnpm db:seed` - Seed data

## Docker
- MySQL: localhost:3306 (smk_user/smk_pass)
- Redis: localhost:6379
- phpMyAdmin: localhost:8080

## Env Variables (backend/.env)
- JWT_SECRET (required, min 32 chars)
- JWT_REFRESH_SECRET (required, min 32 chars)
- DATABASE_* (required)
- REDIS_* (required)

See docs/ for full documentation.

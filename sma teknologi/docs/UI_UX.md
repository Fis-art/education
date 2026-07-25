# UI/UX Design Guidelines
# SMK Teknologi Plus - Website & Admin Dashboard

---

## 1. Design Principles

| Principle | Description |
|-----------|-------------|
| **User-Centric** | Desain berfokus pada kebutuhan siswa, orang tua, guru, dan admin |
| **Accessibility First** | WCAG 2.1 Level AA compliance sebagai baseline |
| **Mobile-First** | Desain dimulai dari mobile, progresif enhance ke desktop |
| **Consistency** | Design System terpusat, komponen reusable, pattern konsisten |
| **Performance** | Optimasi visual tidak mengorbankan kecepatan (LCP < 2.5s) |
| **Clarity** | Hierarki visual jelas, whitespace adequate, typography readable |
| **Trust & Professionalism** | Warna brand, foto berkualitas, konten terstruktur membangun kepercayaan |

---

## 2. Brand Identity

### 2.1 Logo
- **Primary**: Logo SMK Teknologi Plus (Full Color)
- **Secondary**: Monochrome (White/Primary Dark)
- **Icon Only**: Simbol teknologi + huruf T/P (untuk Favicon, App Icon)
- **Clear Space**: Minimum 1x tinggi huruf "T" di sekitar logo

### 2.2 Color Palette

#### Primary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Primary 50** | `#EFF6FF` | 239, 246, 255 | Background subtle, hover states |
| **Primary 100** | `#DBEAFE` | 219, 234, 250 | Light backgrounds, borders |
| **Primary 500** | `#3B82F6` | 59, 130, 246 | **Brand Primary**, Buttons Primary, Links, Active States |
| **Primary 600** | `#2563EB` | 37, 99, 235 | Button Hover, Focus Ring |
| **Primary 700** | `#1D4ED8` | 29, 78, 216 | Button Active, Text Primary |
| **Primary 900** | `#1E3A8A` | 30, 58, 138 | **Primary Dark**, Header Text, Footer Background |

#### Secondary / Accent Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Gold 500** | `#F59E0B` | Highlights, Awards, Prestasi, CTA Secondary |
| **Gold 600** | `#D97706` | Gold Hover |

#### Semantic Colors
| Name | Light Hex | Dark Hex | Usage |
|------|-----------|----------|-------|
| **Success** | `#10B981` | `#34D399` | Success messages, Published status, Positive trends |
| **Warning** | `#F59E0B` | `#FBBF24` | Warnings, Draft status, Pending |
| **Error** | `#EF4444` | `#F87171` | Errors, Rejected status, Destructive actions |
| **Info** | `#3B82F6` | `#60A5FA` | Info messages, Neutral actions |

#### Neutral Colors (Gray Scale)
| Name | Light Hex | Dark Hex | Usage |
|------|-----------|----------|-------|
| **Gray 50** | `#F9FAFB` | `#111827` | Page Background (Light), Text Primary (Dark) |
| **Gray 100** | `#F3F4F6` | `#1F2937` | Card Background (Light), Border (Dark) |
| **Gray 200** | `#E5E7EB` | `#374151` | Borders, Dividers, Disabled Background |
| **Gray 300** | `#D1D5DB` | `#4B5563` | Input Borders, Placeholder Text |
| **Gray 400** | `#9CA3AF` | `#6B7280` | Disabled Text, Icons Secondary |
| **Gray 500** | `#6B7280` | `#9CA3AF` | Body Text Secondary, Meta Information |
| **Gray 600** | `#4B5563` | `#D1D5DB` | Body Text Primary (Light), Headings (Dark) |
| **Gray 700** | `#374151` | `#E5E7EB` | Headings (Light), Important Text |
| **Gray 800** | `#1F2937` | `#F3F4F6` | Headings Primary (Light) |
| **Gray 900** | `#111827` | `#F9FAFB` | Text Primary (Light) |
| **Gray 950** | `#030712` | `#FFFFFF` | Maximum Contrast |

### 2.3 Dark Mode Support
- **Strategy**: CSS Variables + `prefers-color-scheme` + Manual Toggle (localStorage)
- **Implementation**: Tailwind `dark:` variant, CSS Custom Properties untuk brand colors
- **Images**: SVG Icons (currentColor), Logo (Light/Dark variants via `<picture>`)

---

## 3. Typography

### 3.1 Font Families
| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| **UI Sans** | `Inter` | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | Body text, UI labels, Buttons, Forms, Navigation |
| **Display Serif** | `Merriweather` | `Georgia, Cambria, 'Times New Roman', serif` | Hero Headlines, Article Titles, Quote Blocks |
| **Monospace** | `JetBrains Mono` | `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` | Code snippets, NISN, Nomor Pendaftaran |

### 3.2 Type Scale (Rem-based, Mobile First)
| Token | Mobile (clamp) | Desktop | Font Weight | Line Height | Usage |
|-------|----------------|---------|-------------|-------------|-------|
| **Display XL** | `clamp(2.5rem, 5vw, 4rem)` | `4rem` | 700 (Bold) | 1.1 | Hero Headline (Home) |
| **Display LG** | `clamp(2rem, 4vw, 3rem)` | `3rem` | 700 | 1.2 | Page Title (H1) |
| **Display MD** | `clamp(1.75rem, 3vw, 2.25rem)` | `2.25rem` | 600 | 1.25 | Section Title (H2) |
| **Display SM** | `clamp(1.5rem, 2.5vw, 1.875rem)` | `1.875rem` | 600 | 1.3 | Card Title (H3) |
| **Heading LG** | `1.5rem` | `1.5rem` | 600 | 1.4 | H4, Widget Title |
| **Heading MD** | `1.25rem` | `1.25rem` | 600 | 1.4 | H5 |
| **Heading SM** | `1.125rem` | `1.125rem` | 600 | 1.4 | H6 |
| **Body LG** | `1.125rem` | `1.125rem` | 400 | 1.7 | Lead Paragraph, Intro Text |
| **Body MD** | `1rem` | `1rem` | 400 | 1.6 | **Default Body Text** |
| **Body SM** | `0.875rem` | `0.875rem` | 400 | 1.5 | Secondary Text, Meta, Captions |
| **Body XS** | `0.75rem` | `0.75rem` | 400 | 1.5 | Fine Print, Timestamps, Badges |
| **Button** | `0.875rem` | `0.875rem` | 500 | 1.5 | Button Text |
| **Label** | `0.875rem` | `0.875rem` | 500 | 1.5 | Form Labels |
| **Input** | `1rem` | `1rem` | 400 | 1.5 | Form Input Text |

### 3.3 Font Loading Strategy
- **Preload**: `Inter` (woff2), `Merriweather` (woff2) - Critical
- **Font Display**: `swap` untuk semua font
- **Subset**: Latin + Latin-Extended only (Indonesian support)
- **Variable Font**: Inter Variable (Single file, all weights)

---

## 4. Spacing System

### 4.1 Base Unit: 4px (0.25rem)
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px - Base */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

### 4.2 Layout Spacing Tokens
| Token | Value | Usage |
|-------|-------|-------|
| **Container Padding** | `px-4 sm:px-6 lg:px-8` | Page horizontal padding |
| **Section Vertical** | `py-12 sm:py-16 lg:py-20` | Section spacing |
| **Component Gap** | `gap-4 sm:gap-6` | Grid/Flex gap |
| **Card Padding** | `p-4 sm:p-6` | Card internal padding |
| **Form Field Gap** | `gap-2` | Label-Input gap |
| **Inline Gap** | `gap-2` | Button groups, icon+text |

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| **None** | `0` | Tables, Badges (Square) |
| **SM** | `0.25rem` (4px) | Inputs, Buttons, Badges |
| **MD** | `0.375rem` (6px) | Cards, Dropdowns, Modals |
| **LG** | `0.5rem` (8px) | Large Cards, Containers, Images |
| **XL** | `0.75rem` (12px) | Hero Sections, Feature Cards |
| **Full** | `9999px` | Avatars, Pills, Progress Bars |

---

## 6. Shadows & Elevation

| Token | Value (Light) | Value (Dark) | Usage |
|-------|---------------|--------------|-------|
| **SM** | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `0 1px 2px 0 rgb(0 0 0 / 0.3)` | Cards (Subtle), Inputs Focus |
| **MD** | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | `0 4px 6px -1px rgb(0 0 0 / 0.4)` | Cards (Default), Dropdowns |
| **LG** | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | `0 10px 15px -3px rgb(0 0 0 / 0.4)` | Modals, Sidebars, Floating Panels |
| **XL** | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | `0 20px 25px -5px rgb(0 0 0 / 0.5)` | Toasts, Popovers, Tooltips |

---

## 7. Breakpoints (Responsive)

| Name | Min Width | Target Device | Tailwind Prefix |
|------|-----------|---------------|-----------------|
| **Mobile** | 0px | Phone (< 640px) | (default) |
| **Tablet** | 640px | Large Phone / Small Tablet | `sm:` |
| **Tablet LG** | 768px | Tablet Portrait | `md:` |
| **Desktop** | 1024px | Tablet Landscape / Laptop | `lg:` |
| **Desktop LG** | 1280px | Desktop Monitor | `xl:` |
| **Wide** | 1536px | Large Desktop / Ultra-wide | `2xl:` |

**Container Max Widths:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1400px (Custom for content width)

---

## 8. Component Library (Shadcn/UI + Custom)

### 8.1 Base Components (Primitive)
| Component | Variants | States | Notes |
|-----------|----------|--------|-------|
| **Button** | Primary, Secondary, Outline, Ghost, Destructive, Link | Default, Hover, Focus, Active, Disabled, Loading | `size: sm, md, lg, icon` |
| **Input** | Default, Error, Success | Default, Focus, Disabled, ReadOnly | Label, Hint, Error Message |
| **Textarea** | Default, Error | Default, Focus, Disabled | Auto-resize option |
| **Select** | Default, Error, Multi | Default, Focus, Disabled | Searchable, Grouped Options |
| **Checkbox** | Default, Indeterminate | Default, Focus, Disabled, Checked | Label Clickable |
| **Radio Group** | Horizontal, Vertical | Default, Focus, Disabled | |
| **Switch** | Default | Default, Focus, Disabled, Checked | |
| **Label** | Required, Optional | | |
| **Card** | Default, Bordered, Elevated | Hover (Elevated) | Header, Content, Footer slots |
| **Badge** | Default, Secondary, Outline, Destructive, Success, Warning | | Dot variant for status |
| **Avatar** | Image, Fallback (Initials), Shape (Circle/Square) | | Size: xs, sm, md, lg, xl |
| **Dropdown Menu** | Trigger, Content, Item, Separator, Checkbox Item, Radio Item | | Keyboard Nav, Portal |
| **Dialog/Modal** | Trigger, Content, Header, Title, Description, Footer, Close | | Focus Trap, Escape Close, Backdrop |
| **Tooltip** | Default, Delayed | | Positioning (Side, Align) |
| **Toast/Sonner** | Default, Success, Error, Warning, Info, Promise | | Swipe to dismiss, Action Button |
| **Separator** | Horizontal, Vertical, Decorative | | |
| **Scroll Area** | Default, Auto-hide Scrollbar | | |
| **Tabs** | Default, Underline, Pills | Active, Disabled | Keyboard Nav |
| **Accordion** | Single, Multiple | Open, Closed, Disabled | Chevron Animation |
| **Pagination** | Default, Simple, Boundary Links | Active, Disabled | |
| **Data Table** | Sortable, Filterable, Paginated, Selectable, Expandable | Loading, Empty, Error | TanStack Table v8 |
| **Date Picker** | Single, Range, Multiple | | React Day Picker |
| **Rich Text Editor** | Tiptap (Heading, Bold, Italic, List, Link, Image, Table, Code, Blockquote) | | Toolbar, Bubble Menu |
| **Image Upload** | Dropzone, Preview, Reorder, Remove, Caption | Drag-Drop, Paste, Progress | Sharp Processing Preview |
| **Table** | Striped, Hover, Bordered | | Server-side Pagination |

### 8.2 Composite Components (Domain-Specific)
| Component | Description | Props/Slots |
|-----------|-------------|-------------|
| **Hero Slider** | Auto-slide, Dots, Arrows, Pause on Hover, CTA | `slides[]`, `autoplay`, `interval` |
| **News Card** | Image, Category Badge, Title, Excerpt, Date, Author | `news`, `variant: default|featured|compact` |
| **Event Card** | Date Badge, Title, Location, Time, Status | `event`, `variant` |
| **Achievement Card** | Medal Icon, Title, Level, Year, Rank | `achievement` |
| **Teacher Card** | Photo, Name, Position, Department, Contact | `teacher`, `variant` |
| **Department Card** | Icon/Image, Name, Short Desc, Link | `department` |
| **Gallery Grid** | Masonry/Grid, Lightbox, Filter by Category | `images[]`, `categories[]` |
| **Stats Card** | Icon, Value (Counter Animation), Label, Trend | `value`, `label`, `trend`, `icon` |
| **Chart Wrapper** | Line, Bar, Donut, Area (Recharts) | `data`, `config`, `loading` |
| **Form Field** | Label, Input, Error, Hint, Required Asterisk | Composable with RHF |
| **Page Header** | Title, Description, Breadcrumb, Actions | `title`, `description`, `actions` |
| **Empty State** | Illustration, Title, Description, Action | `icon`, `title`, `description`, `action` |
| **Loading State** | Skeleton, Spinner, Progress | `variant` |
| **Error Boundary** | Fallback UI, Retry Button, Report Error | `fallback`, `onReset` |

---

## 9. Page Layouts

### 9.1 Public Website Layout
```text
+--------------------------------------------------+
| Header (Fixed Top)                               |
| [Logo] [Nav: Profil, Akademik, Info, PPDB, Lain] |
| [Search] [Language] [Mobile Menu]                |
+--------------------------------------------------+
|                                                  |
| Main Content (Variable)                          |
|                                                  |
|  Home: Hero Slider → Welcome → Stats → News     |
|  Profil: Sidebar (Submenu) + Content             |
|  Akademik: Grid Cards / Detail Pages             |
|  Informasi: List + Filters + Pagination          |
|  PPDB: Multi-step Form / Status Check            |
|  Lain: List/Grid/Detail                          |
|                                                  |
+--------------------------------------------------+
| Footer                                           |
| [Profil Singkat] [Link Cepat] [Kontak] [Maps]   |
| [Sosmed] [Copyright]                             |
+--------------------------------------------------+
```

### 9.2 Admin Dashboard Layout
```text
+--------------------------------------------------+
| Topbar (Fixed Top)                               |
| [Menu Toggle] [Breadcrumb] [Global Search]       |
| [Notifications] [Theme Toggle] [User Menu]       |
+----------+---------------------------------------+
|          |                                       |
| Sidebar  | Main Content (Scrollable)             |
| (Fixed)  |                                       |
|          | [Page Header]                         |
| [Logo]   | [Content Area]                        |
| [Nav]    |                                       |
| [Collapse]|                                      |
|          |                                       |
+----------+---------------------------------------+
```

**Sidebar Navigation Groups:**
1. **Dashboard** → `/admin`
2. **Manajemen Konten** → Berita, Pengumuman, Agenda, Prestasi, Galeri, Hero Slider, Download
3. **Manajemen Data** → Guru, Jurusan, Ekstrakurikuler, User (Super Admin)
4. **PPDB** → Tahun Ajaran, Pendaftar, Verifikasi
5. **Pengaturan** → Setting Website

---

## 10. Key Page Designs (Wireframe Descriptions)

### 10.1 Home Page
1. **Hero Slider** (Full Width, Height: 60vh Mobile, 70vh Desktop)
   - Slide: Image (Desktop/Mobile), Title, Subtitle, CTA Button
   - Navigation: Dots (Bottom Center), Arrows (Sides)
   - Auto-slide: 5s, Pause on Hover/Focus
2. **Sambutan Kepala Sekolah** (Split Layout: Image Left, Text Right)
   - Foto Kepsek (Circle, Shadow LG), Nama, Jabatan, Paragraph (2-3), Link "Baca Selengkapnya"
3. **Statistik Sekolah** (4 Cards Grid, Counter Animation on Scroll)
   - Siswa, Guru, Jurusan, Prestasi (Icon + Number + Label)
4. **Berita Terbaru** (Section Header: Title + "Lihat Semua" Link)
   - Grid 3 Columns (Desktop), 1 Column (Mobile)
   - Card: Thumbnail (16:9), Category Badge, Title (2 lines clamp), Date, Excerpt (3 lines clamp)
5. **Prestasi Terbaru** (Carousel / Grid 3)
   - Card: Medal Icon (Gold), Title, Tingkat Badge, Tahun, Juara
6. **Agenda Terdekat** (List 5 Items)
   - Date Badge (Circle), Title, Time, Location, Status Badge
7. **Galeri Foto** (Masonry Grid 6-8 Items, "Lihat Semua" → Galeri Page)
   - Lightbox on Click (Keyboard Nav, Swipe Mobile)
8. **Footer** (4 Columns + Bottom Bar)

### 10.2 Berita Detail Page
- **Hero**: Full-width Image, Category Badge, Title, Meta (Author, Date, Read Time, Share Buttons)
- **Content**: Rich Text (Prose styling: Headings, Lists, Blockquotes, Images, Tables, Code Blocks)
- **Tags**: Tag Pills (Link to Search)
- **Related News**: Grid 3 (Same Category, Exclude Current)
- **Previous/Next Navigation**

### 10.3 PPDB Multi-Step Form
- **Progress Indicator**: Steps 1-5 (Horizontal Mobile, Vertical Desktop)
- **Step 1**: Data Pribadi (Nama, NISN, NIK, Tempat/Tgl Lahir, Jenis Kelamin, Agama, Alamat Lengkap, Kontak)
- **Step 2**: Data Orang Tua/Wali (Ayah, Ibu, Wali - Nama, NIK, Pekerjaan, Penghasilan, Kontak, Alamat)
- **Step 3**: Data Sekolah Asal & Pilihan Jurusan (Asal Sekolah, NPSN, Pilihan 1 & 2, Jalur Pendaftaran)
- **Step 4**: Upload Berkas (KK, Akta, Ijazah/SKL, Raport, Foto, KIP/KKS - Drag Drop, Preview, Max Size)
- **Step 5**: Review & Submit (Read-only Summary, Checkbox Persetujuan, Submit Button)
- **Success**: Nomor Pendaftaran (Copy Button), Instruksi Selanjutnya, Download Bukti

### 10.4 Admin Dashboard - Data Table (Generic Pattern)
- **Toolbar**: Search Input, Filter Dropdowns (Status, Category, Date Range), Add Button
- **Table**: Sortable Columns, Row Selection (Bulk Actions), Expandable Row (Detail), Actions Menu (Edit, Delete, View)
- **Pagination**: Page Size Selector (10, 25, 50, 100), Page Numbers, First/Last
- **Empty State**: Illustration, Message, "Tambah Data" Button
- **Loading**: Skeleton Rows (5-10)

### 10.5 Admin - Rich Text Editor (Tiptap)
- **Toolbar**: Heading (H1-H3), Bold, Italic, Strike, Code, Blockquote, Bullet/Ordered List, Task List, Link, Image, Table, Code Block, Horizontal Rule, Undo/Redo
- **Bubble Menu**: On Text Selection (Format, Link, Image)
- **Image Upload**: Drag Drop / Paste → Upload → Insert with Caption
- **Fullscreen Mode**: Toggle
- **Word Count / Read Time**: Footer Status

---

## 11. Interaction & Animation

### 11.1 Transition Tokens
| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| **Fast** | 150ms | `ease-out` | Hover, Focus, Small UI |
| **Normal** | 200ms | `ease-in-out` | Default Transitions, Modals, Dropdowns |
| **Slow** | 300ms | `ease-in-out` | Page Transitions, Side Panels, Complex Animations |
| **Spring** | 400ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Toasts, Popovers, Bouncy Elements |

### 11.2 Key Animations
- **Fade In/Out**: Opacity (Enter/Exit)
- **Slide Up/Down**: Transform Y (Modals, Drawers, Toasts)
- **Scale**: Transform Scale (Buttons Active, Card Hover)
- **Counter**: Number Animation (Stats on Scroll - IntersectionObserver)
- **Shimmer**: Skeleton Loading (Background Gradient Animation)
- **Spinner**: Rotate (Loading Buttons, Page Loading)
- **Accordion**: Height Auto + Opacity (CSS Grid/Details-Summary)

### 11.3 Reduced Motion
- Respect `prefers-reduced-motion: reduce`
- Disable: Auto-slide, Counter Animation, Complex Transitions
- Keep: Instant State Changes, Focus Indicators

---

## 12. Accessibility (WCAG 2.1 AA)

### 12.1 Checklist
- [ ] **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- [ ] **Heading Hierarchy**: H1 → H2 → H3 (No skipping levels)
- [ ] **Color Contrast**: Text 4.5:1 (Normal), 3:1 (Large), UI 3:1
- [ ] **Focus Visible**: Custom Focus Ring (`ring-2 ring-primary-500 ring-offset-2`)
- [ ] **Keyboard Navigation**: All interactive elements reachable, logical Tab order
- [ ] **ARIA Labels**: Icon-only buttons, Form inputs, Live Regions (Toast, Loading)
- [ ] **Alt Text**: All informative images (Decorative: `alt=""`)
- [ ] **Form Labels**: Explicit `<label for="id">` or `aria-label`
- [ ] **Error Messages**: `aria-describedby` linking to error text, `aria-invalid`
- [ ] **Skip Link**: "Skip to main content" (First focusable element)
- [ ] **Language**: `lang="id"` on `<html>`, `lang="en"` on English content
- [ ] **Touch Targets**: Minimum 44x44px (Mobile)
- [ ] **Zoom**: Content readable at 200% zoom (No horizontal scroll)
- [ ] **Screen Reader**: Tested with NVDA/JAWS/VoiceOver

### 12.2 ARIA Patterns Used
- **Dialog/Modal**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, Focus Trap
- **Dropdown**: `role="menu"`, `aria-expanded`, `aria-controls`, Keyboard (Arrow Keys, Escape, Home/End)
- **Tabs**: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`
- **Accordion**: `<details>`/`<summary>` (Native) or `aria-expanded`, `aria-controls`
- **Toast**: `role="status"`, `aria-live="polite"`, `aria-atomic="true"`
- **Table Sort**: `aria-sort="ascending|descending|none"`, `aria-label` on Header
- **Pagination**: `aria-label="Pagination"`, `aria-current="page"` on Active
- **Progress**: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

---

## 13. Icon System

- **Library**: Lucide React (Primary), Heroicons (Alternative)
- **Size Tokens**: `size-4` (16px), `size-5` (20px), `size-6` (24px), `size-8` (32px)
- **Stroke Width**: 2px (Default), 1.5px (Small)
- **Usage**: `stroke-current` (Inherit Text Color), `fill-none`
- **Custom Icons**: SVG Sprite / React Components in `components/ui/icons/`

---

## 14. Image Guidelines

| Type | Format | Max Width | Optimization |
|------|--------|-----------|--------------|
| **Hero/Background** | WebP (Primary), JPG (Fallback) | 1920px | Sharp Responsive (400, 800, 1200, 1920), Quality 85 |
| **Content/Article** | WebP, JPG, PNG | 1200px | Sharp Responsive (400, 800, 1200), Quality 85 |
| **Thumbnail/Card** | WebP | 400px | Sharp (400w), Quality 80 |
| **Avatar/Profile** | WebP, JPG | 512px | Sharp (128, 256, 512), Quality 90, Circle Crop |
| **Logo/Icon** | SVG (Preferred), PNG | - | Optimized (SVGO) |
| **Gallery** | WebP, JPG | 1920px | Sharp (400, 800, 1200, 1920), Lightbox Original |
| **Documents** | PDF (Original) | - | Thumbnail Generation (First Page → WebP) |

**Lazy Loading**: Native `loading="lazy"` + IntersectionObserver for LQIP (Blur Placeholder)

---

## 15. Content Guidelines

### 15.1 Writing Style
- **Tone**: Professional, Welcoming, Informative, Trustworthy
- **Language**: Bahasa Indonesia (Formal - EYD), English (Optional)
- **Voice**: Active Voice, Clear Instructions, Concise
- **Formatting**: Short Paragraphs (2-3 sentences), Bullet Points, Descriptive Headings

### 15.2 SEO Content
- **Meta Title**: ≤ 60 chars, Primary Keyword Front-loaded, Brand Suffix
- **Meta Description**: ≤ 155 chars, Action-oriented, Includes Keyword
- **Headings**: H1 = Page Title (1 per page), H2/H3 for Sections
- **Images**: Descriptive Alt Text (Keyword-relevant), File Names (kebab-case)
- **Structured Data**: JSON-LD (Organization, WebSite, Article, Event, Course)

---

## 16. Design Tokens (CSS Variables) - Reference

```css
:root {
  /* Colors */
  --color-primary-50: #EFF6FF;
  --color-primary-100: #DBEAFE;
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --color-primary-900: #1E3A8A;
  
  --color-gold-500: #F59E0B;
  --color-gold-600: #D97706;
  
  --color-success-500: #10B981;
  --color-warning-500: #F59E0B;
  --color-error-500: #EF4444;
  --color-info-500: #3B82F6;
  
  /* Neutrals */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  --color-gray-950: #030712;
  
  /* Semantic Aliases */
  --color-bg-primary: var(--color-gray-50);
  --color-bg-secondary: #FFFFFF;
  --color-bg-tertiary: var(--color-gray-100);
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-400);
  --color-border-primary: var(--color-gray-200);
  --color-border-focus: var(--color-primary-500);
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: 'Merriweather', Georgia, serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 4rem;
  
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-normal: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
  
  /* Z-Index */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
  --z-toast: 800;
}
```

---

## 17. Design Handoff Checklist

- [ ] Figma File Organized (Pages: Foundations, Components, Pages, Prototypes)
- [ ] Design Tokens Exported (CSS Variables, Tailwind Config)
- [ ] Component Library Documented (Props, Variants, States, Examples)
- [ ] Responsive Breakpoints Defined for All Pages
- [ ] Interaction Specs (Hover, Focus, Loading, Error, Empty, Success)
- [ ] Accessibility Annotations (Focus Order, ARIA, Alt Text)
- [ ] Asset Exports (SVG Icons, Images @1x/2x/3x, Fonts)
- [ ] Dark Mode Variants for All Components
- [ ] Animation Specs (Duration, Easing, Reduced Motion)
- [ ] Content Guidelines (Character Limits, Tone, SEO)

---

*Document Version: 1.0*
*Last Updated: 2026-07-19*
*Author: UI/UX Designer*
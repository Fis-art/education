import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/public-layout'
import { AdminLayout } from '@/components/layout/admin-layout'
import { HomePage } from '@/features/public/home/home-page'
import { ProfilPage } from '@/features/public/profil/profil-page'
import { AkademikPage } from '@/features/public/akademik/akademik-page'
import { InformasiPage } from '@/features/public/informasi/informasi-page'
import { PPDBPage } from '@/features/public/ppdb/ppdb-page'
import { LainnyaPage } from '@/features/public/lain/lainnya-page'
import { LoginPage } from '@/features/auth/login-page'
import { AdminDashboardPage } from '@/features/admin/dashboard/admin-dashboard-page'
import { AdminUsersPage } from '@/features/admin/users/admin-users-page'
import { AdminGuruPage } from '@/features/admin/guru/admin-guru-page'
import { AdminJurusanPage } from '@/features/admin/jurusan/admin-jurusan-page'
import { AdminBeritaPage } from '@/features/admin/berita/admin-berita-page'
import { AdminPengumumanPage } from '@/features/admin/pengumuman/admin-pengumuman-page'
import { AdminAgendaPage } from '@/features/admin/agenda/admin-agenda-page'
import { AdminPrestasiPage } from '@/features/admin/prestasi/admin-prestasi-page'
import { AdminGaleriPage } from '@/features/admin/galeri/admin-galeri-page'
import { AdminHeroSliderPage } from '@/features/admin/hero-slider/admin-hero-slider-page'
import { AdminDownloadPage } from '@/features/admin/download/admin-download-page'
import { AdminPPDBPage } from '@/features/admin/ppdb/admin-ppdb-page'
import { AdminSettingPage } from '@/features/admin/setting/admin-setting-page'
import { ProtectedRoute } from '@/features/auth/protected-route'
import { NotFoundPage } from '@/features/public/not-found-page'

export function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profil/*" element={<ProfilPage />} />
        <Route path="/akademik/*" element={<AkademikPage />} />
        <Route path="/informasi/*" element={<InformasiPage />} />
        <Route path="/ppdb/*" element={<PPDBPage />} />
        <Route path="/lainnya/*" element={<LainnyaPage />} />
        <Route path="/download" element={<LainnyaPage />} />
        <Route path="/faq" element={<LainnyaPage />} />
        <Route path="/kontak" element={<LainnyaPage />} />
        <Route path="/galeri" element={<LainnyaPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/users/*" element={<AdminUsersPage />} />
        <Route path="/admin/guru/*" element={<AdminGuruPage />} />
        <Route path="/admin/jurusan/*" element={<AdminJurusanPage />} />
        <Route path="/admin/berita/*" element={<AdminBeritaPage />} />
        <Route path="/admin/pengumuman/*" element={<AdminPengumumanPage />} />
        <Route path="/admin/agenda/*" element={<AdminAgendaPage />} />
        <Route path="/admin/prestasi/*" element={<AdminPrestasiPage />} />
        <Route path="/admin/galeri/*" element={<AdminGaleriPage />} />
        <Route path="/admin/hero-slider/*" element={<AdminHeroSliderPage />} />
        <Route path="/admin/download/*" element={<AdminDownloadPage />} />
        <Route path="/admin/ppdb/*" element={<AdminPPDBPage />} />
        <Route path="/admin/setting/*" element={<AdminSettingPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
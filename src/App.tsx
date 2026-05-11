import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { CardsProvider } from '@/contexts/CardsContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { BottomNav } from '@/components/BottomNav'
import { Sidebar } from '@/components/Sidebar'
import styles from './App.module.css'

import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import HomePage from '@/pages/HomePage'
import AddCardPage from '@/pages/AddCardPage'
import CardViewPage from '@/pages/CardViewPage'
import ProfilePage from '@/pages/ProfilePage'
import CardsPage from '@/pages/CardsPage'
import ProUpgradePage from '@/pages/ProUpgradePage'
import ProUpgradePageAlt from '@/pages/ProUpgradePageAlt'
import ProSuccessPage from '@/pages/ProSuccessPage'
import AdminDashboard from '@/pages/AdminDashboard'
import SettingsPage from '@/pages/SettingsPage'
import EditCardPage from '@/pages/EditCardPage'
import LandingPage from '@/pages/LandingPage'

function AppLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

function Protected({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

function RootRedirect() {
  const { session, loading } = useAuth()
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh' }}>
      <div className="spinner" style={{ borderTopColor: 'var(--color-primary)', borderColor: 'var(--color-border)' }} />
    </div>
  )
  return <Navigate to={session ? '/home' : '/login'} replace />
}

export default function App() {
  return (
    <AuthProvider>
      <CardsProvider>
      <BrowserRouter>
        <Routes>
          {/* Public — no bottom nav */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected — all get bottom nav */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Protected><HomePage /></Protected>} />
            <Route path="/cards" element={<Protected><CardsPage /></Protected>} />
            <Route path="/cards/:id" element={<Protected><CardViewPage /></Protected>} />
            <Route path="/cards/:id/edit" element={<Protected><EditCardPage /></Protected>} />
            <Route path="/add" element={<Protected><AddCardPage /></Protected>} />
            <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
            <Route path="/pro" element={<Protected><ProUpgradePage /></Protected>} />
            <Route path="/pro-alt" element={<Protected><ProUpgradePageAlt /></Protected>} />
            <Route path="/pro/success" element={<Protected><ProSuccessPage /></Protected>} />
            <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
            <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
          </Route>

          {/* Root: logged in → app, guest → login */}
          <Route path="/" element={<RootRedirect />} />
          {/* Landing — marketing page */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
      </CardsProvider>
    </AuthProvider>
  )
}

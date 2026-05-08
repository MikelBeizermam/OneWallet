import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'

import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import HomePage from '@/pages/HomePage'
import AddCardPage from '@/pages/AddCardPage'
import CardViewPage from '@/pages/CardViewPage'
import ProfilePage from '@/pages/ProfilePage'
import CardsPage from '@/pages/CardsPage'
import ProUpgradePage from '@/pages/ProUpgradePage'
import ProSuccessPage from '@/pages/ProSuccessPage'
import AdminDashboard from '@/pages/AdminDashboard'
import SettingsPage from '@/pages/SettingsPage'
import EditCardPage from '@/pages/EditCardPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected */}
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/cards" element={<ProtectedRoute><CardsPage /></ProtectedRoute>} />
          <Route path="/cards/:id" element={<ProtectedRoute><CardViewPage /></ProtectedRoute>} />
          <Route path="/cards/:id/edit" element={<ProtectedRoute><EditCardPage /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddCardPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/pro" element={<ProtectedRoute><ProUpgradePage /></ProtectedRoute>} />
          <Route path="/pro/success" element={<ProtectedRoute><ProSuccessPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

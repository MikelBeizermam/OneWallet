import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh' }}>
        <div className="spinner" style={{ borderTopColor: 'var(--color-primary)', borderColor: 'var(--color-border)' }} />
      </div>
    )
  }

  if (!session) return <Navigate to="/login" replace />
  return <>{children}</>
}

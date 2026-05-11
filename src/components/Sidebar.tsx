import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'

const navItems = [
  { to: '/home', label: 'בית', icon: HomeIcon },
  { to: '/cards', label: 'כרטיסים', icon: CardsIcon },
  { to: '/add', label: 'הוספה', icon: PlusIcon },
  { to: '/profile', label: 'פרופיל', icon: ProfileIcon },
]

export function Sidebar() {
  const navigate = useNavigate()
  return (
    <aside className={styles.sidebar}>
      <button type="button" className={styles.logo} onClick={() => navigate('/home')}>
        <img src="/app-icon.png" alt="OneWallet" className={styles.logoImg} />
        <span className={styles.logoText}>OneWallet</span>
      </button>
      <nav className={styles.nav}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  )
}
function CardsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="3"/>
      <path d="M2 10h20"/>
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 8v8M8 12h8"/>
    </svg>
  )
}
function ProfileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  )
}

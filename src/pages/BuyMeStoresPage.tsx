import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BUSINESSES, CATEGORIES, AREAS } from '@/data/buyme-businesses'
import styles from './BuyMeStoresPage.module.css'

export default function BuyMeStoresPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArea, setSelectedArea] = useState('כל הארץ')
  const [onlineOnly, setOnlineOnly] = useState(false)

  const filtered = useMemo(() => {
    return BUSINESSES.filter(b => {
      const matchCategory = selectedCategory === 'all' || b.category === selectedCategory
      const matchArea =
        selectedArea === 'כל הארץ' ||
        b.areas.includes(selectedArea) ||
        b.areas.includes('כל הארץ')
      const matchOnline = !onlineOnly || b.online
      const q = search.trim().toLowerCase()
      const matchSearch = !q || b.name.toLowerCase().includes(q) || b.tagline.toLowerCase().includes(q)
      return matchCategory && matchArea && matchOnline && matchSearch
    })
  }, [selectedCategory, selectedArea, onlineOnly, search])

  const handleSearch = () => setSearch(searchInput)

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button type="button" className={styles.backBtn} onClick={() => navigate(-1)} aria-label="חזרה">
          <ChevronIcon />
        </button>
        <img src="/buyme-logo.png" alt="BuyMe" className={styles.logo} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
        <span className={styles.logoFallback}>BuyMe</span>
      </div>

      {/* Search bar */}
      <div className={styles.searchBar}>
        <div className={styles.searchInputWrap}>
          <SearchIcon />
          <input
            className={styles.searchInput}
            placeholder="חיפוש בית עסק"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <select
          className={styles.areaSelect}
          value={selectedArea}
          onChange={e => setSelectedArea(e.target.value)}
        >
          {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <button type="button" className={styles.searchBtn} onClick={handleSearch}>
          חיפוש
        </button>
      </div>

      {/* Categories */}
      <div className={styles.categoriesScroll}>
        <div className={styles.categories}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.catBtn} ${selectedCategory === cat.id ? styles.catBtnActive : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className={styles.catCircle} style={{ background: cat.bg }}>
                {cat.emoji}
              </span>
              <span className={styles.catLabel}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results bar */}
      <div className={styles.resultsBar}>
        <span className={styles.resultsCount}>{filtered.length} בתי עסק</span>
        <label className={styles.onlineToggle}>
          <span>מימוש אונליין</span>
          <div
            className={`${styles.toggle} ${onlineOnly ? styles.toggleOn : ''}`}
            onClick={() => setOnlineOnly(v => !v)}
            role="switch"
            aria-checked={onlineOnly}
          >
            <div className={styles.toggleKnob} />
          </div>
        </label>
      </div>

      {/* Business grid */}
      <div className={styles.grid}>
        {filtered.map(b => (
          <div key={b.id} className={styles.card}>
            <div className={styles.cardImage} style={{ background: b.bgColor }}>
              <div className={styles.cardLogo} style={{ background: b.logoBg }}>
                <span className={styles.cardLogoText}>{b.logoText}</span>
              </div>
              {b.isNew && <span className={styles.badgeNew}>חדש</span>}
              {b.canBook && <span className={styles.badgeBook}>הזמנת מקום</span>}
              {b.online && <span className={styles.badgeOnline}>אונליין</span>}
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardName}>{b.name}</p>
              <p className={styles.cardTagline}>{b.tagline}</p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>לא נמצאו בתי עסק</p>
            <button type="button" onClick={() => { setSearch(''); setSearchInput(''); setSelectedCategory('all'); setSelectedArea('כל הארץ'); setOnlineOnly(false) }}>
              נקה סינון
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ChevronIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
}
function SearchIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>
}

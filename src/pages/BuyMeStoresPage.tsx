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
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const handleImageError = (id: string) => {
    setFailedImages(prev => new Set(prev).add(id))
  }

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
        <span className={styles.logoText}>BuyMe</span>
        <span className={styles.logoSub}>בתי עסק</span>
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
            aria-label="חיפוש בית עסק"
          />
        </div>
        <select
          className={styles.areaSelect}
          value={selectedArea}
          onChange={e => setSelectedArea(e.target.value)}
          aria-label="סינון לפי אזור"
          title="סינון לפי אזור"
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
              <span className={styles.catCircle} data-bg={cat.id}>
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
          <button
            type="button"
            className={`${styles.toggle} ${onlineOnly ? styles.toggleOn : ''}`}
            onClick={() => setOnlineOnly(v => !v)}
            role="switch"
            aria-checked={String(onlineOnly) as 'true' | 'false'}
            aria-label="מימוש אונליין בלבד"
            title="מימוש אונליין"
          >
            <span className={styles.toggleKnob} />
          </button>
        </label>
      </div>

      {/* Business grid */}
      <div className={styles.grid}>
        {filtered.map(b => (
          <div key={b.id} className={styles.card}>
            <div
              className={`${styles.cardImage} ${failedImages.has(b.id) ? styles.imageFailed : ''}`}
              data-category={b.category}
            >
              {!failedImages.has(b.id) && (
                <img
                  src={b.imageUrl}
                  alt={b.name}
                  className={styles.cardImg}
                  loading="lazy"
                  onError={() => handleImageError(b.id)}
                />
              )}
              <span className={styles.cardLogo}>
                {b.logoText}
              </span>
              {b.isNew && <span className={styles.badgeNew}>חדש</span>}
              {b.canBook && <span className={styles.badgeBook}>הזמנת מקום</span>}
              {b.online && !b.canBook && !b.isNew && <span className={styles.badgeOnline}>אונליין</span>}
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
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setSearchInput('')
                setSelectedCategory('all')
                setSelectedArea('כל הארץ')
                setOnlineOnly(false)
              }}
            >
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

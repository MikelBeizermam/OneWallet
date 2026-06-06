import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { HTZ_BUSINESSES, HTZ_CATEGORIES, HTZ_AREAS } from '@/data/htz-businesses'
import styles from './HTZStoresPage.module.css'

const CATEGORY_FALLBACKS: Record<string, string> = {
  fashion: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=225&fit=crop&auto=format',
  food:    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=225&fit=crop&auto=format',
  beauty:  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=225&fit=crop&auto=format',
  home:    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop&auto=format',
  shoes:   'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=225&fit=crop&auto=format',
  sports:  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=225&fit=crop&auto=format',
  kids:    'https://images.unsplash.com/photo-1558171813-d95ec1e79bff?w=400&h=225&fit=crop&auto=format',
  hotels:  'https://images.unsplash.com/photo-1566073129761-4b4e47bab68d?w=400&h=225&fit=crop&auto=format',
  jewelry: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=225&fit=crop&auto=format',
  books:   'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop&auto=format',
}

export default function HTZStoresPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArea, setSelectedArea] = useState('כל הארץ')
  const [onlineOnly, setOnlineOnly] = useState(false)

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, category: string) => {
    const img = e.currentTarget
    const fallback = CATEGORY_FALLBACKS[category]
    if (fallback && img.src !== fallback) {
      img.src = fallback
    } else {
      img.style.display = 'none'
      img.parentElement?.classList.add(styles.imageFailed)
    }
  }

  const filtered = useMemo(() => {
    return HTZ_BUSINESSES.filter(b => {
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
      <div className={styles.topBar}>
        <button type="button" className={styles.backBtn} onClick={() => navigate(-1)} aria-label="חזרה">
          <ChevronIcon />
        </button>
        <span className={styles.logoText}>htz</span>
        <span className={styles.logoSub}>בתי עסק</span>
      </div>

      <div className={styles.searchBar}>
        <div className={styles.searchRow1}>
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
        </div>
        <div className={styles.searchRow2}>
          <select
            className={styles.areaSelect}
            value={selectedArea}
            onChange={e => setSelectedArea(e.target.value)}
            aria-label="סינון לפי אזור"
            title="סינון לפי אזור"
          >
            {HTZ_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <button type="button" className={styles.searchBtn} onClick={handleSearch}>
            חיפוש
          </button>
        </div>
      </div>

      <div className={styles.categoriesScroll}>
        <div className={styles.categories}>
          {HTZ_CATEGORIES.map(cat => (
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

      <div className={styles.resultsBar}>
        <span className={styles.resultsCount}>{filtered.length} בתי עסק</span>
        <label className={styles.onlineToggle}>
          <span>מימוש אונליין</span>
          <button
            type="button"
            className={`${styles.toggle} ${onlineOnly ? styles.toggleOn : ''}`}
            onClick={() => setOnlineOnly(v => !v)}
            role="switch"
            aria-checked={onlineOnly ? 'true' : 'false'}
            aria-label="מימוש אונליין בלבד"
            title="מימוש אונליין"
          >
            <span className={styles.toggleKnob} />
          </button>
        </label>
      </div>

      <div className={styles.grid}>
        {filtered.map(b => (
          <div key={b.id} className={styles.card}>
            <div className={styles.cardImage} data-category={b.category}>
              <img
                src={b.imageUrl}
                alt={b.name}
                className={styles.cardImg}
                loading="lazy"
                onError={e => handleImageError(e, b.category)}
              />
              <span className={styles.cardLogo}>{b.logoText}</span>
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

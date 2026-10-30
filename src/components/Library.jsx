import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { genres } from '../data/games'
import GameCard from './GameCard'

const SORTS = {
  list: { label: 'My order', fn: () => 0 },
  newest: { label: 'Newest', fn: (a, b) => b.year - a.year },
  oldest: { label: 'Oldest', fn: (a, b) => a.year - b.year },
  az: { label: 'A–Z', fn: (a, b) => a.title.localeCompare(b.title) },
}

export default function Library({ games, onOpen }) {
  const [genre, setGenre] = useState('All')
  const [sort, setSort] = useState('list')
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const visible = games
    .filter((g) => genre === 'All' || g.genre === genre)
    .filter((g) => !q || `${g.title} ${g.subtitle ?? ''} ${g.studio}`.toLowerCase().includes(q))
    .sort(SORTS[sort].fn)

  return (
    <section className="section" id="library">
      <SectionHead index="01" title="The Library" sub="Everything I’ve played: finished stories, multiplayer favourites and what’s on my screen right now. Tap a cover to open its gallery." />

      <div className="toolbar">
        <div className="chips">
          {genres.map((g) => (
            <button key={g} className={`chip ${g === genre ? 'active' : ''}`} onClick={() => setGenre(g)}>
              {g === genre && <motion.span layoutId="chip-bg" className="chip-bg" />}
              <span>{g}</span>
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <input
            className="search"
            placeholder="Search games or studios…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            {Object.entries(SORTS).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.div layout className="grid">
        <AnimatePresence mode="popLayout">
          {visible.map((g, i) => (
            <GameCard key={g.slug} game={g} number={games.indexOf(g) + 1} delay={i * 0.04} onOpen={onOpen} />
          ))}
        </AnimatePresence>
      </motion.div>
      {visible.length === 0 && <p className="empty">No games match “{query}”.</p>}
    </section>
  )
}

export function SectionHead({ index, title, sub }) {
  return (
    <motion.div
      className="section-head"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="section-index">{index}</span>
      <h2>{title}</h2>
      <p>{sub}</p>
    </motion.div>
  )
}

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'

const SLIDE_MS = 6000

export default function Hero({ games, onOpen }) {
  const [index, setIndex] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 220])
  const fade = useTransform(scrollY, [0, 500], [1, 0])
  const game = games[index]

  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % games.length), SLIDE_MS)
    return () => clearTimeout(id)
  }, [index, games.length])

  const studios = new Set(games.map((g) => g.studio)).size
  const finished = games.filter((g) => g.status === 'completed').length
  const years = games.map((g) => g.year)
  const span = Math.max(...years) - Math.min(...years)

  return (
    <header className="hero" id="top" style={{ '--accent': game.accent }}>
      <motion.div className="hero-bg" style={{ y }}>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={game.slug}
            src={game.hero}
            alt=""
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: SLIDE_MS / 1000 + 1.2, ease: 'linear' } }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="hero-shade" />

      <motion.div className="hero-content" style={{ opacity: fade }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Player profile · Every game I’ve played
        </motion.p>
        <h1 className="hero-title">
          {['Every world', 'I’ve lived in.'].map((line, i) => (
            <span className="line" key={line}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Stat value={games.length} label="Games played" />
          <Stat value={finished} label="Story finished" />
          <Stat value={studios} label="Studios" />
          <Stat value={span} label="Years of gaming" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.button
            key={game.slug}
            className="now-showing"
            onClick={() => onOpen(game)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
          >
            <span className="now-label">Now showing</span>
            <span className="now-title">
              {game.title} {game.subtitle && <em>{game.subtitle}</em>}
            </span>
            <span className="now-cta">View →</span>
          </motion.button>
        </AnimatePresence>
      </motion.div>

      <div className="hero-dots">
        {games.map((g, i) => (
          <button
            key={g.slug}
            aria-label={g.title}
            className={i === index ? 'active' : ''}
            onClick={() => setIndex(i)}
          >
            {i === index && (
              <motion.span
                className="fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.a
        href="#library"
        className="scroll-hint"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll ↓
      </motion.a>
    </header>
  )
}

function Stat({ value, label }) {
  return (
    <div className="stat">
      <span className="stat-value">{String(value).padStart(2, '0')}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

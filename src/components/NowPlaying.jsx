import { motion } from 'framer-motion'

export default function NowPlaying({ games, onOpen }) {
  const current = games.filter((g) => g.status === 'playing')
  if (current.length === 0) return null

  return (
    <section className="section now-playing">
      {current.map((g) => (
        <motion.button
          key={g.slug}
          className="np-card"
          style={{ '--accent': g.accent }}
          onClick={() => onOpen(g)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={g.hero} alt="" />
          <span className="np-shade" />
          <span className="np-content">
            <span className="np-label">
              <span className="np-bars" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              Currently playing
            </span>
            <span className="np-title">
              {g.title} {g.subtitle && <em>{g.subtitle}</em>}
            </span>
            <span className="np-tagline">“{g.tagline}”</span>
            <span className="np-cta">Open save file →</span>
          </span>
        </motion.button>
      ))}
    </section>
  )
}

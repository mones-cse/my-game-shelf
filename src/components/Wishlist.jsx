import { motion } from 'framer-motion'
import { SectionHead } from './Library'

export default function Wishlist({ games }) {
  return (
    <section className="section" id="wishlist">
      <SectionHead index="03" title="Wishlist" sub={`${games.length} worlds still waiting for me. Next up on the backlog.`} />
      <div className="wish-grid">
        {games.map((g, i) => (
          <motion.article
            key={g.slug}
            className="wish-card"
            style={{ '--accent': g.accent }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="wish-art">
              <img className="wish-hero" src={g.hero} alt="" loading="lazy" />
              <img className="wish-poster" src={g.poster} alt={g.title} loading="lazy" />
              <span className="wish-heart" aria-hidden>
                ♥
              </span>
            </div>
            <div className="wish-text">
              <span className="wish-meta">
                {g.studio} · {g.year ?? 'TBA'}
              </span>
              <h3>
                {g.title} {g.subtitle && <em>{g.subtitle}</em>}
              </h3>
              <p>{g.pitch}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

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
              <span className="wish-badges">
                {g.starred && (
                  <span className="wish-badge wish-star" title="Starred">
                    ★
                  </span>
                )}
                {g.movie && (
                  <span className="wish-badge wish-movie" title="Watch as a movie">
                    <svg viewBox="0 0 24 24" aria-hidden>
                      <path d="M4 10h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Zm-.4-4.7 14.6-3.9a1 1 0 0 1 1.2.7l.6 2.3L4.8 8.6l-.6-2.1a1 1 0 0 1 .7-1.2Zm3.1-.4 2.2 2.6 2-.5L8.7 4.4l-2 .5Zm5.2-1.4 2.2 2.6 2-.5-2.2-2.6-2 .5Z" />
                    </svg>
                  </span>
                )}
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

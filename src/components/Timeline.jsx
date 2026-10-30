import { motion } from 'framer-motion'
import { SectionHead } from './Library'

export default function Timeline({ games, onOpen }) {
  const sorted = [...games].sort((a, b) => a.year - b.year)

  return (
    <section className="section" id="timeline">
      <SectionHead index="02" title="Release Timeline" sub="From 1998 tactics to 2025 football. My games by release year." />
      <div className="timeline">
        <div className="timeline-line" />
        {sorted.map((g, i) => (
          <motion.button
            key={g.slug}
            className={`tl-item ${i % 2 ? 'right' : 'left'}`}
            style={{ '--accent': g.accent }}
            onClick={() => onOpen(g)}
            initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="tl-dot" />
            <span className="tl-card">
              <img src={g.hero} alt="" loading="lazy" />
              <span className="tl-text">
                <span className="tl-year">{g.year}</span>
                <span className="tl-title">
                  {g.title} {g.subtitle && <em>{g.subtitle}</em>}
                </span>
                <span className="tl-studio">{g.studio}</span>
              </span>
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  )
}

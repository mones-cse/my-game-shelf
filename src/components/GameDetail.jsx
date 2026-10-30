import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { STATUS } from '../data/games'

const ease = [0.22, 1, 0.36, 1]

export default function GameDetail({ game, games, onClose, onSwitch }) {
  const [lightbox, setLightbox] = useState(null)
  const idx = games.indexOf(game)
  const prev = games[(idx - 1 + games.length) % games.length]
  const next = games[(idx + 1) % games.length]

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox !== null) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onSwitch(next)
      if (e.key === 'ArrowLeft') onSwitch(prev)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, next, prev, onClose, onSwitch])

  return (
    <motion.div
      className="detail"
      style={{ '--accent': game.accent }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        key={`bg-${game.slug}`}
        className="detail-bg"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease }}
      >
        <img src={game.hero} alt="" />
      </motion.div>
      <div className="detail-shade" />

      <button className="detail-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      <div className="detail-scroll" key={game.slug}>
        <div className="detail-inner">
          <motion.img
            className="detail-poster"
            src={game.poster}
            alt={game.title}
            initial={{ opacity: 0, y: 60, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          />

          <div className="detail-text">
            <motion.p className="eyebrow" {...rise(0.2)}>
              {String(idx + 1).padStart(2, '0')} / {String(games.length).padStart(2, '0')} · {game.genre}
            </motion.p>
            <motion.h2 className="detail-title" {...rise(0.28)}>
              {game.title}
              {game.subtitle && <span>{game.subtitle}</span>}
            </motion.h2>
            <motion.p className="detail-tagline" {...rise(0.36)}>
              “{game.tagline}”
            </motion.p>
            <motion.div className="detail-meta" {...rise(0.44)}>
              <Meta label="Released" value={game.year} />
              <Meta label="Studio" value={game.studio} />
              <Meta label="Status" value={STATUS[game.status].label} color={STATUS[game.status].color} />
            </motion.div>
            <motion.p className="detail-summary" {...rise(0.52)}>
              {game.summary}
            </motion.p>
          </div>
        </div>

        <div className="gallery">
          <motion.h3 {...rise(0.6)}>Gallery · {game.gallery.length} shots</motion.h3>
          <div className="gallery-grid">
            {game.gallery.map((src, i) => (
              <motion.button
                key={src}
                className={`shot ${i === 0 ? 'wide' : ''}`}
                style={lastSpan(game.gallery.length, i)}
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65 + i * 0.08, ease }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={src} alt={`${game.title} screenshot ${i + 1}`} loading="lazy" />
                <span className="shot-zoom">⤢</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="detail-nav">
          <button onClick={() => onSwitch(prev)}>
            <span>← Previous</span>
            <b>{prev.title}</b>
          </button>
          <button onClick={() => onSwitch(next)} className="right">
            <span>Next →</span>
            <b>{next.title}</b>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={game.gallery} index={lightbox} setIndex={setLightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Lightbox({ images, index, setIndex, onClose }) {
  const go = (d) => setIndex((index + d + images.length) % images.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, onClose, setIndex])

  return (
    <motion.div className="lightbox" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt=""
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.3 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) go(1)
            else if (info.offset.x > 80) go(-1)
          }}
        />
      </AnimatePresence>
      <button className="lb-arrow left" onClick={(e) => (e.stopPropagation(), go(-1))} aria-label="Previous">
        ‹
      </button>
      <button className="lb-arrow right" onClick={(e) => (e.stopPropagation(), go(1))} aria-label="Next">
        ›
      </button>
      <div className="lb-count">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  )
}

function Meta({ label, value, color }) {
  return (
    <div className="meta" style={color && { '--status': color }}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  )
}

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

// Desktop grid is 3 columns with a 2x2 lead image; stretch the last shot so the final row has no holes.
function lastSpan(count, i) {
  const leftover = (count - 3) % 3
  if (i !== count - 1 || count <= 3 || leftover === 0) return undefined
  const span = 4 - leftover
  return { '--span': span }
}

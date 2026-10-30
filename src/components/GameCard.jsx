import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { STATUS } from '../data/games'

export default function GameCard({ game, number, delay, onOpen }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const spring = { stiffness: 200, damping: 20 }
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), spring)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), spring)
  const glareX = useTransform(mx, (v) => `${v * 100}%`)
  const glareY = useTransform(my, (v) => `${v * 100}%`)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.article
      layout
      className="card-wrap"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ '--accent': game.accent }}
    >
      <motion.button
        className="card"
        onClick={() => onOpen(game)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY }}
        whileTap={{ scale: 0.97 }}
      >
        <img src={game.poster} alt={game.title} loading="lazy" />
        <motion.span className="card-glare" style={{ '--gx': glareX, '--gy': glareY }} />
        <span className="card-shade" />
        <span className="card-num">{String(number).padStart(2, '0')}</span>
        <span className={`card-badge ${game.status}`} style={{ '--status': STATUS[game.status].color }}>
          {STATUS[game.status].label}
        </span>
        <span className="card-info">
          <span className="card-meta">
            {game.genre} · {game.year}
          </span>
          <span className="card-title">{game.title}</span>
          {game.subtitle && <span className="card-sub">{game.subtitle}</span>}
        </span>
      </motion.button>
    </motion.article>
  )
}

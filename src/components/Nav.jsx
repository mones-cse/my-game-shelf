import { motion, useScroll, useSpring } from 'framer-motion'

export default function Nav({ games }) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const playing = games.filter((g) => g.status === 'playing').length

  return (
    <motion.nav
      className="nav"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="logo">
        <span className="logo-mark">▶</span> SAVE<span className="slash">//</span>FILE
      </a>
      <div className="nav-links">
        <a href="#library">Library</a>
        <a href="#timeline">Timeline</a>
        <a href="#wishlist">Wishlist</a>
        <span className="nav-count">
          <span className="dot" /> {games.length} games
          {playing > 0 && <span className="nav-playing">· {playing} playing</span>}
        </span>
      </div>
      <motion.div className="nav-progress" style={{ scaleX: progress }} />
    </motion.nav>
  )
}

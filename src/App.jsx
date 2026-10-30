import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { games, wishlist } from './data/games'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Library from './components/Library'
import Timeline from './components/Timeline'
import GameDetail from './components/GameDetail'
import Footer from './components/Footer'
import NowPlaying from './components/NowPlaying'
import Wishlist from './components/Wishlist'

export default function App() {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
  }, [selected])

  return (
    <>
      <div className="grain" aria-hidden />
      <Nav games={games} />
      <Hero games={games} onOpen={setSelected} />
      <Marquee games={games} />
      <NowPlaying games={games} onOpen={setSelected} />
      <Library games={games} onOpen={setSelected} />
      <Timeline games={games} onOpen={setSelected} />
      <Wishlist games={wishlist} />
      <Footer count={games.length} />
      <AnimatePresence>
        {selected && (
          <GameDetail
            key="detail"
            game={selected}
            games={games}
            onClose={() => setSelected(null)}
            onSwitch={setSelected}
          />
        )}
      </AnimatePresence>
    </>
  )
}

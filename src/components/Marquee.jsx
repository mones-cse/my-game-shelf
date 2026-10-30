export default function Marquee({ games }) {
  const items = games.map((g) => [g.title, g.subtitle].filter(Boolean).join(' '))
  const row = [...items, ...items]

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i}>
            {t} <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  )
}

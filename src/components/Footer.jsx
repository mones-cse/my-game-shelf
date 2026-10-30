export default function Footer({ count }) {
  return (
    <footer className="footer">
      <p className="footer-big">
        GAME <span>OVER</span>?
      </p>
      <p>Not even close. {count} games in — next save file loading…</p>
      <p className="footer-small">
        Images from Steam (including archived store pages), Wikipedia and official trailers. All games and artwork belong to their respective owners.
      </p>
    </footer>
  )
}

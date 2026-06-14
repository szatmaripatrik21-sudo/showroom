import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <p className="font-display text-8xl font-semibold text-sp-gold/20 mb-6">404</p>
      <h1 className="font-display text-3xl font-semibold text-sp-text mb-4">Az oldal nem található.</h1>
      <p className="font-body text-base text-sp-text-muted mb-10">Lehet, hogy a link megváltozott, vagy az oldal nem létezik.</p>
      <Link
        to="/"
        className="font-body text-sm font-medium text-sp-gold border border-sp-gold/40 rounded-full px-6 py-2.5 hover:bg-sp-gold/8 transition-all duration-200"
      >
        Vissza a főoldalra
      </Link>
    </section>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'

const columns = [
  {
    title: "Maison",
    links: ["Our Story", "Ateliers", "Sustainability", "Careers", "Press"],
  },
  {
    title: "Client Care",
    links: ["Contact Us", "Shipping & Returns", "Size Guide", "Care Guide", "FAQ"],
  },
  {
    title: "Collections",
    links: ["Women", "Men", "Home & Living", "Electronics", "New Arrivals"],
  },
]

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="mt-24 bg-coal border-t border-line">
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <h2 onClick={() => navigate("/")} className="font-display text-4xl luxury-gradient-text cursor-pointer">
              Zentro
            </h2>
            <p className="mt-2 text-[11px] tracking-[0.35em] uppercase text-muted">
              Luxury Commerce
            </p>
            <p className="mt-6 max-w-sm text-sm leading-7 text-cream/70">
              A curated multi-vendor maison — timeless ethnic craft, fine jewellery
              and modern essentials, presented in one dark, elegant gallery.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-gold/60 to-transparent" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold-soft">Est. 2025</span>
              <div className="flex-1 h-px bg-gradient-to-l from-gold/60 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h5 className="text-[11px] tracking-[0.3em] uppercase text-gold-soft">
                  {col.title}
                </h5>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => navigate("/")}
                        className="text-sm text-cream/65 hover:text-gold-soft transition-colors"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Zentro. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted">
            <span className="hover:text-gold-soft cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-gold-soft cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-gold-soft cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-gold-soft cursor-pointer transition-colors">Pinterest</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className="relative overflow-hidden">
      {/* ambient gold glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-gold/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-gold-deep/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-14 lg:pt-20 pb-10 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.02] px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold-soft">
              The festive edit is live
            </span>
          </div>

          <h1 className="mt-6 font-display text-5xl lg:text-7xl leading-[1.02]">
            <span className="text-cream">Wear the</span>
            <br />
            <span className="luxury-gradient-text italic">art of occasion</span>
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-7 text-cream/65">
            Handloom silks, temple jewellery and modern tailoring — curated from
            trusted sellers into one dark, elegant gallery.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/search-products")}
              sx={{ px: 4, py: 1.5 }}
            >
              Shop the collection
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/become-seller")}
              sx={{
                px: 4, py: 1.5,
                borderColor: "rgba(212,175,55,0.5)",
                color: "#e8c96a",
                "&:hover": { borderColor: "#d4af37", background: "rgba(212,175,55,0.08)" },
              }}
            >
              Become a seller
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-8 text-sm">
            {[
              ["40k+", "Curated pieces"],
              ["2.5k+", "Trusted sellers"],
              ["4.8★", "Buyer rating"],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="font-display text-2xl text-gold-soft">{stat}</p>
                <p className="mt-1 text-xs tracking-[0.2em] uppercase text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-gold/25 via-transparent to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-line gold-ring">
            <img
              src="https://www.libas.in/cdn/shop/files/eoss-desktop.jpg?v=1719849154&width=1920"
              alt="Festive collection"
              className="h-[320px] lg:h-[460px] w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-gold-soft">Wedding season</p>
                <p className="mt-1 font-display text-2xl text-cream">Up to 50% off silk edits</p>
              </div>
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate("/search-products")}
                sx={{ borderRadius: 999 }}
              >
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner

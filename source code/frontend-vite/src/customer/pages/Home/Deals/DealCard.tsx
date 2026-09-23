import React from 'react'
import type { Deal } from '../../../../types/dealTypes'
import { useNavigate } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const DealCard = ({deal, index}:{deal:Deal; index:number}) => {
  const navigate=useNavigate();
  const claimed = Math.min(92, 48 + ((deal.discount ?? 0) % 40));
  return (
    <article
      onClick={()=>navigate(`/products/${deal.category.categoryId}`)}
      className='group snap-start shrink-0 w-[240px] lg:w-[260px] cursor-pointer overflow-hidden rounded-[20px] border border-line bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-luxury'
    >
      <div className="relative h-[250px] overflow-hidden">
        <img
          className='h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110'
          src={deal.category.image}
          alt=""
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />
        <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-gold-soft to-gold px-3 py-1 text-[11px] font-bold tracking-widest text-ink shadow-luxury">
          {deal.discount}% OFF
        </span>
        <span className="absolute top-3 right-3 font-display text-lg text-cream/40">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute bottom-3 left-4 right-4">
          <p className='font-display text-xl leading-tight text-cream capitalize'>
            {deal.category.categoryId.split("_").join(" ")}
          </p>
        </div>
      </div>

      <div className='p-4'>
        <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase">
          <span className="text-muted">{claimed}% claimed</span>
          <span className="text-gold-soft">Ending soon</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft"
            style={{ width: `${claimed}%` }}
          />
        </div>
        <span className="mt-3 inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-cream/70 transition-all group-hover:gap-3 group-hover:text-gold-soft">
          Shop now <ArrowForwardIcon sx={{ fontSize: 14 }} />
        </span>
      </div>
    </article>
  )
}

export default DealCard

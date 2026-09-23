import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';


const ElectronicCategoryCard = ({item, index}:any) => {
  const navigate=useNavigate();

  return (
    <button
      onClick={()=>navigate(`/products/${item.categoryId}`)}
      className='group snap-start shrink-0 w-[132px] lg:w-[156px] rounded-2xl border border-line bg-card p-4 pt-5 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-luxury'
    >
      <span className="text-[10px] tracking-[0.25em] text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex h-20 w-full items-center justify-center overflow-hidden">
        <img
          className='max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110'
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
      </div>
      <span className='text-xs font-medium text-center text-cream/80 group-hover:text-gold-soft transition-colors'>
        {item.name}
      </span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-gold-soft opacity-0 transition-all duration-300 group-hover:opacity-100">
        <ArrowOutwardIcon sx={{ fontSize: 14 }} />
      </span>
    </button>
  )
}

export default ElectronicCategoryCard

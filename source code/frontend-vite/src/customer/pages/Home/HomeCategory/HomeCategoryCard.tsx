import React from 'react'
import "./HomeCategoryCard.css"
import { useNavigate } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const HomeCategoryCard = ({item, index}:any) => {
  const navigate=useNavigate()
  return (
    <div
      onClick={()=>navigate(`/products/${item.categoryId}`)}
      className='group snap-start shrink-0 w-[168px] lg:w-[196px] cursor-pointer'
    >
      <div className='arch-frame relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[24px]'>
        <img
          className='h-full w-full object-cover object-top'
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
        <span className="absolute top-4 left-1/2 -translate-x-1/2 font-display text-lg text-gold-soft/80">
          {String((index ?? 0) + 1).padStart(2, "0")}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <h1 className='font-display text-[17px] leading-snug text-cream'>{item.name}</h1>
          <span className="mt-1 inline-flex items-center gap-1 text-[10px] tracking-[0.3em] uppercase text-gold-soft opacity-0 transition-all duration-500 group-hover:opacity-100">
            View <ArrowForwardIcon sx={{ fontSize: 12 }} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default HomeCategoryCard

import React, { useRef } from 'react'
import HomeCategoryCard from './HomeCategoryCard'
import { useAppSelector } from '../../../../Redux Toolkit/Store';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HomeCategory = () => {
  const { homePage} = useAppSelector((store) => store);
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    railRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 flex justify-end gap-2 px-6 lg:px-10">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll categories left"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-gold-soft transition-all hover:border-gold/60 hover:shadow-luxury"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll categories right"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-gold-soft transition-all hover:border-gold/60 hover:shadow-luxury"
        >
          <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
        </button>
      </div>
      <div
        ref={railRef}
        className='flex gap-5 lg:gap-7 overflow-x-auto snap-x snap-mandatory px-6 lg:px-10 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      >
        {homePage.homePageData?.shopByCategories.map((item, i:number)=><HomeCategoryCard key={item.categoryId ?? i} item={item} index={i}/>)}
      </div>
    </div>
  )
}

export default HomeCategory

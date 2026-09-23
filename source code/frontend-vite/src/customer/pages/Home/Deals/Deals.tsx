import React, { useEffect, useRef, useState } from "react";
import DealCard from "./DealCard";
import { useAppSelector } from "../../../../Redux Toolkit/Store";
import type { Deal } from "../../../../types/dealTypes";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const useMidnightCountdown = () => {
  const [left, setLeft] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const s = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
      const h = String(Math.floor(s / 3600)).padStart(2, "0");
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const sec = String(s % 60).padStart(2, "0");
      setLeft(`${h}:${m}:${sec}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
};

export default function DealSlider() {
  const { homePage } = useAppSelector(store => store)
  const countdown = useMidnightCountdown();
  const deals: Deal[] = homePage.homePageData?.deals ?? [];
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    railRef.current?.scrollBy({ left: dir * 560, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-line bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft to-gold-deep text-ink">
            <AccessTimeIcon sx={{ fontSize: 20 }} />
          </span>
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted">Offers refresh at midnight</p>
            <p className="font-display text-2xl text-gold-soft tabular-nums">{countdown}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll deals left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-gold-soft transition-all hover:border-gold/60 hover:shadow-luxury"
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll deals right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-gold-soft transition-all hover:border-gold/60 hover:shadow-luxury"
          >
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {deals.map((item: Deal, i: number) => (
          <DealCard key={i} deal={item} index={i} />
        ))}
      </div>
    </div>
  );
}

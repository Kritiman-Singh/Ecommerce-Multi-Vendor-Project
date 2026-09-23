import React from "react";
import ElectronicCategoryCard from "./ElectronicCategoryCard";
import { useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../../../Redux Toolkit/Store";
const electronics = [
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Laptop",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/x/9/j/-original-imahyjzh7m2zsqdg.jpeg?q=70",

    categoryId:"laptops"
  },
  {
    section: "ELECTRIC_CATEGORIES",

    name: "Mobile",
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/5/t/j/edge-50-fusion-pb300002in-motorola-original-imahywzrfagkuyxx.jpeg?q=70&crop=false",

    categoryId:"mobiles"
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Smartwatch",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/f/g/g/-original-imagywnz46fngcks.jpeg?q=70",

    categoryId:"smart_watches"
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Headphones",
    image:
      "https://rukminim2.flixcart.com/image/612/612/kz4gh3k0/headphone/c/v/r/-original-imagb7bmhdgghzxq.jpeg?q=70",

    categoryId:"headphones_headsets"
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Speaker",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/6/z/2/-original-imahfgfkr5gkk9aq.jpeg?q=70",

    categoryId:"speakers"
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Tv",
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/television/9/p/9/-original-imah2v29z86u7b79.jpeg?q=70",

    categoryId:"television"
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Camera",
    image:
      "https://rukminim2.flixcart.com/image/312/312/jfbfde80/camera/n/r/n/canon-eos-eos-3000d-dslr-original-imaf3t5h9yuyc5zu.jpeg?q=70",

    categoryId:"cameras"
  },
];

const ElectronicCategory = () => {
  const {homePage}=useAppSelector(store=>store)
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const items = homePage.homePageData?.electricCategories ?? electronics;
  return (
    <section className="border-b border-line bg-coal/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-gold-soft">Gadgets</p>
            <h2 className="mt-1 font-display text-2xl lg:text-3xl luxury-gradient-text">
              The Tech Atelier
            </h2>
          </div>
          <p className="hidden sm:block text-xs tracking-[0.2em] uppercase text-muted">
            Swipe →
          </p>
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items
            .slice(0, isSmallScreen ? 5 : electronics.length)
            .map((item, idx) => (
              <ElectronicCategoryCard key={idx} item={item} index={idx} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ElectronicCategory;

import React from "react";
import { useAppSelector } from "../../../../Redux Toolkit/Store";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const grid = [
  {"categoryId":"women_lehenga_cholis",
        "section": "GRID",
        "name": "women lehenga cholis",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23807268/2023/6/29/9930b235-5318-4755-abbe-08f99e969e781688026636544LehengaCholi7.jpg",
  },
  {"categoryId":"men_formal_shoes",
        "section": "GRID",
        "name": "men formal shoes",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/24651572/2023/8/25/4fbf6d8c-d093-46c5-a5a6-7dd67c0c76551692964752597HouseofPataudiMenTanFauxLeatherFormalSlipOnLoafers1.jpg",
  },
  {"categoryId":"women_lehenga_cholis",
        "section": "GRID",
        "name": "women lehenga cholis",
    image:
      "https://images.pexels.com/photos/12730873/pexels-photo-12730873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {"categoryId":"men_sherwanis",
        "section": "GRID",
        "name": "men sherwanis",
    image:
      "https://shreeman.in/cdn/shop/files/20_3cfbd5a3-ecb6-482a-b798-7ffd9de1c784.jpg?v=1712061674&width=700",
  },
  {"categoryId":"women_jewellery",
        "section": "GRID",
        "name": "women jewellery",
    image:
      "https://media.istockphoto.com/id/1276740597/photo/indian-traditional-gold-necklace.jpg?b=1&s=612x612&w=0&k=20&c=S-QnNZKqf2u3L-GIaDiIinNRU74GBWQaIDwY7gYJboY=",
  },
  {"categoryId":"women_footwear",
        "section": "GRID",
        "name": "women footwear",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13837166/2021/8/19/04e40e02-4c56-4705-94d0-f444b29973aa1629373611707-House-of-Pataudi-Women-Maroon-Embellished-Handcrafted-Wedges-1.jpg",
  },
];

const TopBrand = () => {
  const {homePage}=useAppSelector(store=>store)
  const navigate = useNavigate()
  const data = homePage.homePageData?.grid?.length ? homePage.homePageData.grid : grid;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-5 px-5 lg:px-20">
      {data.slice(0, 6).map((item: any, i: number) => (
        <article
          key={i}
          onClick={() => item.categoryId && navigate(`/products/${item.categoryId}`)}
          className="group relative h-[340px] sm:h-[380px] xl:h-[420px] overflow-hidden rounded-[20px] border border-line cursor-pointer transition-all duration-500 hover:border-gold/60 hover:shadow-luxury"
        >
          <img
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            src={item.image}
            alt={item.name ?? ""}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

          <span className="absolute top-4 left-4 font-display text-3xl text-cream/25 transition-colors duration-500 group-hover:text-gold-soft/70">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="absolute top-4 right-4 rounded-full border border-cream/25 px-2.5 py-0.5 text-[9px] tracking-[0.25em] uppercase text-cream/80 backdrop-blur-sm">
            Look
          </span>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold-soft">Handpicked</p>
            <h3 className="mt-1 font-display text-lg leading-tight text-cream capitalize">
              {(item.name ?? "").split("_").join(" ")}
            </h3>
            <span className="mt-2 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-cream/70 transition-all duration-500 group-hover:gap-3 group-hover:text-gold-soft">
              Explore <ArrowForwardIcon sx={{ fontSize: 13 }} />
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default TopBrand;

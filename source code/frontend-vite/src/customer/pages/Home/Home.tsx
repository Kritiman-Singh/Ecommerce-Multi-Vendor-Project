import React, { useState } from 'react'
import Banner from './Banner/Banner'
import HomeCategory from './HomeCategory/HomeCategory'
import TopBrand from './TopBrands/Grid'
import ElectronicCategory from './Electronic Category/ElectronicCategory'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Backdrop, Button, CircularProgress } from '@mui/material'
import ChatBot from '../ChatBot/ChatBot'
import { useNavigate } from 'react-router-dom'
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppSelector } from '../../../Redux Toolkit/Store'
import DealSlider from './Deals/Deals'



const SectionHeading = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) => (
    <div className="text-center max-w-2xl mx-auto px-5">
        <p className="text-[11px] tracking-[0.35em] uppercase text-gold-soft">{eyebrow}</p>
        <h1 className="mt-3 font-display text-3xl lg:text-5xl luxury-gradient-text">{title}</h1>
        {sub && <p className="mt-3 text-sm leading-6 text-cream/60">{sub}</p>}
        <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
            <span className="text-gold">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
        </div>
    </div>
)

const Home = () => {
    const [showChatBot, setShowChatBot] = useState(false)
    const { homePage } = useAppSelector(store => store)
    const navigate = useNavigate();

    const handleShowChatBot = () => {
        setShowChatBot(!showChatBot)
    }
    const handleCloseChatBot = () => {
        setShowChatBot(false)
    }
    const becomeSellerClick = () => {
        navigate("/become-seller")
    }
    return (
        <>
        {(!homePage.loading)?<div className='relative bg-ink text-cream'>
            <Banner />

            {homePage.homePageData?.electricCategories && <ElectronicCategory />}

            {homePage.homePageData?.grid && <section className="py-16 lg:py-24">
                <div className="pb-10">
                    <SectionHeading eyebrow="The Lookbook" title="Wedding Gallery" sub="Six couture stories — swipe through silks, sherwanis and jewels." />
                </div>
                <TopBrand />
            </section>}

            {homePage.homePageData?.deals && <section className='py-16 lg:py-20 bg-coal/50 border-y border-line'>
                <div className="pb-10">
                    <SectionHeading eyebrow="Limited time" title="Today's Private Deals" sub="Members-only prices, refreshed every midnight." />
                </div>
                <DealSlider/>
            </section>}

            {homePage.homePageData?.shopByCategories && <section className='py-16 lg:py-24'>
                <div className="pb-10">
                    <SectionHeading eyebrow="The Aisles" title="Shop by Category" sub="Fifteen archways — step into décor, couture and everything between." />
                </div>
                <HomeCategory />
            </section>}

            <section className='mx-5 lg:mx-20 mb-4 relative overflow-hidden rounded-[28px] border border-line bg-gradient-to-br from-card via-coal to-ink'>
                <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />
                <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-gold-deep/15 blur-[100px]" />
                <div className='relative px-8 lg:px-16 py-14 lg:py-20 max-w-3xl mx-auto text-center'>
                    <p className='text-[11px] tracking-[0.35em] uppercase text-gold-soft'>For sellers · Zentro Atelier</p>
                    <h1 className='mt-4 font-display text-3xl lg:text-5xl leading-tight'>
                        Open your <span className="luxury-gradient-text italic">boutique</span> with us
                    </h1>
                    <p className='mt-4 text-sm lg:text-base leading-7 text-cream/65'>
                        Zero listing fee to start, payouts on time, and a storefront
                        worthy of your craft — join 2,500+ sellers already selling.
                    </p>
                    <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
                        <Button
                            onClick={becomeSellerClick}
                            startIcon={<StorefrontIcon />}
                            variant="contained"
                            sx={{ px: 4, py: 1.4 }}
                        >
                            Become Seller
                        </Button>
                        <Button
                            onClick={() => navigate("/search-products")}
                            endIcon={<ArrowForwardIcon />}
                            variant="outlined"
                            sx={{
                                px: 4, py: 1.4,
                                borderColor: "rgba(var(--line))",
                                color: "rgb(var(--gold-soft))",
                                "&:hover": { borderColor: "rgb(var(--gold))" },
                            }}
                        >
                            Explore marketplace
                        </Button>
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-8 lg:gap-12 text-sm">
                        {[
                            ["0 ₹", "Listing fee"],
                            ["7 days", "Payout cycle"],
                            ["40k+", "Happy sellers"],
                        ].map(([stat, label]) => (
                            <div key={label}>
                                <p className="font-display text-2xl text-gold-soft">{stat}</p>
                                <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-muted">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='fixed bottom-8 right-8 z-40'>
                {showChatBot ? <ChatBot handleClose={handleCloseChatBot} /> : <Button onClick={handleShowChatBot} variant='contained' sx={{ borderRadius: "999px", minWidth: 0, width: 60, height: 60 }} className='gold-ring'>
                    <ChatBubbleIcon sx={{ color: "#0a0a0b", fontSize: "1.7rem" }} />
                </Button>}
            </section>

        </div>: <Backdrop
                open={true}
                sx={{ background: "rgb(var(--ink))", color: "rgb(var(--gold))" }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}

        </>

    )
}

export default Home

import React, { useState, useEffect } from "react";
import type { MouseEvent } from "react";
import "./ProductCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../../types/productTypes";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../Redux Toolkit/Store";
import { addProductToWishlist } from "../../../../Redux Toolkit/Customer/WishlistSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { isWishlisted } from "../../../../util/isWishlisted";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ChatBot from "../../ChatBot/ChatBot";

interface ProductCardProps {
    item: Product;
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    borderRadius: ".5rem",
    boxShadow: 24,

};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const { wishlist } = useAppSelector((store) => store);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showChatBot, setShowChatBot] = useState(false)

    const handleAddWishlist = (event: MouseEvent) => {
        event.stopPropagation();
        setIsFavorite((prev) => !prev);
        if (item.id) dispatch(addProductToWishlist({ productId: item.id }));
    };

    useEffect(() => {
        let interval: any;
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isHovered, item.images.length]);

    const handleShowChatBot = (event: MouseEvent) => {
        event.stopPropagation();
        setShowChatBot(true)
    }
    const handleCloseChatBot = (e: MouseEvent) => {
        e.stopPropagation();
        setShowChatBot(false)
    }

    const wishlisted = wishlist.wishlist ? isWishlisted(wishlist.wishlist, item) : isFavorite;

    return (
        <>
            <div
                onClick={() =>
                    navigate(
                        `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`
                    )
                }
                className="group px-2 relative"
            >
                <div className="overflow-hidden rounded-2xl border border-line bg-card transition-all duration-300 hover:border-gold/50 hover:shadow-luxury">
                    <div
                        className="card !border-0 !rounded-none"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {item.images.map((image: any, index: number) => (
                            <img
                                key={index}
                                className="card-media object-top"
                                src={image}
                                alt={`product-${index}`}
                                style={{
                                    transform: `translateX(${(index - currentImage) * 100}%)`,
                                }}
                            />
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent pointer-events-none" />
                        {(item.discountPercent ?? 0) > 0 && (
                            <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-gold-soft to-gold px-2.5 py-1 text-[10px] font-bold tracking-widest text-ink">
                                {item.discountPercent}% OFF
                            </span>
                        )}
                        <button
                            onClick={handleAddWishlist}
                            className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition-all ${wishlisted ? "border-gold bg-gold text-ink" : "border-white/15 bg-ink/60 text-cream hover:border-gold/60"}`}
                        >
                            {wishlisted ? (
                                <FavoriteIcon sx={{ fontSize: 18 }} />
                            ) : (
                                <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                            )}
                        </button>
                        {isHovered && (
                            <div className="indicator flex flex-col items-center space-y-2">
                                <div className="flex gap-2">
                                    {item.images.map((item: any, index: number) => (
                                        <button
                                            key={index}
                                            className={`indicator-button ${index === currentImage ? "active" : ""
                                                }`}
                                            onClick={(e) => { e.stopPropagation(); setCurrentImage(index); }}
                                        />
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleShowChatBot}
                                        variant="contained"
                                        size="small"
                                        sx={{ borderRadius: 999, minWidth: 0, px: 1.5 }}
                                    >
                                        <ModeCommentIcon sx={{ fontSize: 16, color: "#0a0a0b" }} />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="details p-4 space-y-1.5">
                        <div className="name">
                            <h1 className="text-[11px] tracking-[0.22em] uppercase text-gold-soft/90 truncate">
                                {item.seller?.businessDetails.businessName}
                            </h1>
                            <p className="mt-1 truncate text-sm text-cream/85">{item.title}</p>
                        </div>
                        <div className="price flex items-center gap-2.5">
                            <span className="font-display text-lg text-cream">
                                ₹{item.sellingPrice}
                            </span>
                            <span className="text thin-line-through text-xs text-muted">
                                ₹{item.mrpPrice}
                            </span>
                            <span className="text-xs font-semibold text-gold-soft">
                                {item.discountPercent}% off
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            {showChatBot && <section className="absolute left-16 top-0">
                <Modal
                    open={true}
                    onClose={handleCloseChatBot}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <ChatBot handleClose={handleCloseChatBot} productId={item.id} />
                    </Box>
                </Modal>

            </section>}
        </>
    );
};

export default ProductCard;

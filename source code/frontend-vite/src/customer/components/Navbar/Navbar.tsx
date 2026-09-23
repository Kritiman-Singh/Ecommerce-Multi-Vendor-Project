import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import { FavoriteBorder } from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeMode } from "../../../Theme/ThemeContext";


const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const { user, cart, sellers } = useAppSelector((store) => store);
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();
  const location = useLocation();

  // close the mega menu whenever the route changes
  useEffect(() => {
    setShowSheet(false);
  }, [location.pathname]);

  // auth pages stay clean — no category links on the login screen
  const hideCategories = location.pathname === "/login";

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId && showSheet) {
      setShowSheet(false);
    } else {
      setSelectedCategory(categoryId);
      setShowSheet(true);
    }
  };


  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };



  const becomeSellerClick = () => {
    if (sellers.profile?.id) {
      navigate("/seller")
    } else navigate("/become-seller")
  }



  return (
    <Box
      sx={{ zIndex: 30 }}
      className="sticky top-0 left-0 right-0 bg-ink/85 blur-bg border-b border-line"
    >
      {/* gold hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
      <div className="flex items-center justify-between px-5 lg:px-10 h-[72px]">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-3">
            {!isLarge && (
              <IconButton onClick={() => toggleDrawer(true)()}>
                <MenuIcon className="text-cream" sx={{ fontSize: 28 }} />
              </IconButton>
            )}
            <div onClick={() => navigate("/")} className="cursor-pointer leading-none">
              <h1
                className="logo text-xl md:text-[26px] luxury-gradient-text"
              >
                Zentro
              </h1>
              <p className="hidden md:block text-[10px] tracking-[0.35em] uppercase text-muted mt-1">
                Luxury Commerce
              </p>
            </div>
          </div>

          {isLarge && !hideCategories && (
            <ul
              className="flex items-center gap-1 text-[13px] tracking-[0.18em] uppercase text-cream/80"
            >
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onClick={() => handleCategoryClick(item.categoryId)}
                  className={`cursor-pointer h-[72px] px-4 flex items-center gap-1 border-b-2 transition-colors select-none ${selectedCategory === item.categoryId && showSheet
                    ? "text-gold border-gold"
                    : "border-transparent hover:text-gold"
                    }`}
                >
                  {item.name}
                  <span
                    className={`text-[10px] transition-transform duration-300 ${selectedCategory === item.categoryId && showSheet ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-1 lg:gap-3 items-center">
          <IconButton
            onClick={toggleMode}
            title={mode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            sx={{ border: "1px solid rgba(212,175,55,0.22)" }}
          >
            {mode === "dark" ? (
              <LightModeIcon className="text-cream" sx={{ fontSize: 22 }} />
            ) : (
              <DarkModeIcon className="text-cream" sx={{ fontSize: 22 }} />
            )}
          </IconButton>

          <IconButton
            onClick={() => navigate("/search-products")}
            sx={{ border: "1px solid rgba(212,175,55,0.22)" }}
          >
            <SearchIcon className="text-cream" sx={{ fontSize: 22 }} />
          </IconButton>

          {user.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2"
              sx={{ color: "#f5efe0" }}
            >
              <Avatar
                sx={{ width: 30, height: 30, border: "1px solid rgba(212,175,55,0.6)" }}
                src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
              />
              <h1 className="font-semibold hidden lg:block normal-case tracking-wide">
                {user.user?.fullName?.split(" ")[0]}
              </h1>
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AccountCircleIcon sx={{ fontSize: "16px" }} />}
              onClick={() => navigate("/login")}
              sx={{ px: 3 }}
            >
              Login
            </Button>
          )}

          <IconButton
            onClick={() => navigate("/wishlist")}
            sx={{ border: "1px solid rgba(212,175,55,0.22)" }}
          >
            <FavoriteBorder sx={{ fontSize: 22 }}
              className="text-cream" />
          </IconButton>

          <IconButton
            onClick={() => navigate("/cart")}
            sx={{ border: "1px solid rgba(212,175,55,0.22)" }}
          >
            <Badge badgeContent={cart.cart?.cartItems.length} color="primary">
              <AddShoppingCartIcon
                sx={{ fontSize: 22 }}
                className="text-cream"
              />
            </Badge>
          </IconButton>

          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon />}
              variant="outlined"
              sx={{
                ml: 1,
                borderColor: "rgba(212,175,55,0.5)",
                color: "#e8c96a",
                "&:hover": { borderColor: "#d4af37", background: "rgba(212,175,55,0.08)" },
              }}
            >
              Become Seller
            </Button>
          )}
        </div>
      </div>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
      >
        {<DrawerList toggleDrawer={toggleDrawer} />}
      </Drawer>
      {showSheet && selectedCategory && !hideCategories && createPortal(
        <>
          {/* dimmed backdrop — page behind the open menu is hidden, click closes */}
          <div
            className="fixed inset-x-0 top-[74px] bottom-0 z-[70] bg-ink/60 backdrop-blur-[2px]"
            onClick={() => setShowSheet(false)}
          />
          {/* solid menu panel above the backdrop */}
          <div className="fixed inset-x-0 top-[74px] z-[80] px-4 lg:px-10 pointer-events-none">
            <div className="pointer-events-auto max-w-[1400px] mx-auto">
              <CategorySheet
                setShowSheet={setShowSheet}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </>,
        document.body
      )}
    </Box>
  );
};

export default Navbar;

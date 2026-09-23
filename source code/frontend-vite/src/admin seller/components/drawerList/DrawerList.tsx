import * as React from "react";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import { performLogout } from "../../../Redux Toolkit/Customer/AuthSlice";

export interface Menu{
    name: string;
    path: string;
    icon: React.ReactElement<any>;
    activeIcon: React.ReactElement<any>;
}

interface DrawerListProps{
    toggleDrawer?:any;
    menu:Menu[];
    menu2:Menu[];
}

const DrawerList = ({ toggleDrawer,menu,menu2 }: DrawerListProps) => {

    const dispatch = useAppDispatch()


    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(performLogout())
    }

    const handleClick = (item: any)=>() => {

        if (item.name === "Logout") {
            handleLogout()

        }
        navigate(item.path);
        if(toggleDrawer) toggleDrawer(false)();
    }

    const row = (item: Menu) => {
        const active = item.path === location.pathname;
        return (
            <div key={item.name}
                onClick={handleClick(item)}
                className="pr-6 cursor-pointer">
                <p className={`${active ? "bg-gradient-to-r from-gold-soft to-gold text-ink shadow-luxury" : "text-cream/70 hover:text-gold-soft hover:bg-white/[0.03]"} flex items-center px-5 py-3 rounded-r-full transition-all`}>
                    <ListItemIcon sx={{ color: active ? "#0a0a0b" : "#d4af37", minWidth: 40 }}>{active ? item.activeIcon : item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 700 : 500 }} />
                </p>
            </div>
        );
    };

    return (
        <div className="h-full bg-coal">
            <div
                className="flex flex-col justify-between h-full w-[300px] border-r border-line py-5"

            >
                <div>
                    <div className="px-6 pb-5">
                        <h1 className="font-display text-xl luxury-gradient-text">Zentro</h1>
                        <p className="text-[9px] tracking-[0.35em] uppercase text-muted mt-1">Atelier Panel</p>
                    </div>
                    <div className="space-y-2">
                        {menu.map((item) => row(item))}
                    </div>
                </div>
                <div className="space-y-4">
                    <Divider sx={{ borderColor: "rgba(212,175,55,0.16)" }} />
                    <div className="space-y-2">
                        {menu2.map((item) => row(item))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawerList;

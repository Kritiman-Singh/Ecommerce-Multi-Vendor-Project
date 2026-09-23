import * as React from "react";
import DrawerList from "../../admin seller/components/drawerList/DrawerList";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { Category } from "@mui/icons-material";
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory2';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

const menu = [
    {
        name: "Dashboard",
        path: "/admin",
        icon: <DashboardIcon className="text-gold" />,
        activeIcon: <DashboardIcon className="text-ink" />,
    },
    {
        name: "Coupons",
        path: "/admin/coupon",
        icon: <IntegrationInstructionsIcon className="text-gold" />,
        activeIcon: <IntegrationInstructionsIcon className="text-ink" />,
    },
    {
        name: "Add New Coupon",
        path: "/admin/add-coupon",
        icon: <AddIcon className="text-gold" />,
        activeIcon: <AddIcon className="text-ink" />,
    },
    {
        name: "Home Page",
        path: "/admin/home-grid",
        icon: <HomeIcon className="text-gold" />,
        activeIcon: <HomeIcon className="text-ink" />,
    },
    {
        name: "Electronics Category",
        path: "/admin/electronics-category",
        icon: <ElectricBoltIcon className="text-gold" />,
        activeIcon: <ElectricBoltIcon className="text-ink" />,
    },
    {
        name: "Shop By Category",
        path: "/admin/shop-by-category",
        icon: <Category className="text-gold" />,
        activeIcon: <Category className="text-ink" />,
    },
    {
        name: "Deals",
        path: "/admin/deals",
        icon: <LocalOfferIcon className="text-gold" />,
        activeIcon: <LocalOfferIcon className="text-ink" />,
    },
    {
        name: "Categories",
        path: "/admin/categories",
        icon: <CategoryIcon className="text-gold" />,
        activeIcon: <CategoryIcon className="text-ink" />,
    },
    {
        name: "Products",
        path: "/admin/products",
        icon: <InventoryIcon className="text-gold" />,
        activeIcon: <InventoryIcon className="text-ink" />,
    },
    {
        name: "Add Product",
        path: "/admin/add-product",
        icon: <AddIcon className="text-gold" />,
        activeIcon: <AddIcon className="text-ink" />,
    },

];

const menu2 = [

    {
        name: "Account",
        path: "/seller/account",
        icon: <AccountBoxIcon className="text-gold" />,
        activeIcon: <AccountBoxIcon className="text-ink" />,
    },
    {
        name: "Logout",
        path: "/",
        icon: <LogoutIcon className="text-gold" />,
        activeIcon: <LogoutIcon className="text-ink" />,
    },

]

interface DrawerListProps{
    toggleDrawer?:any;
}

const AdminDrawerList = ({ toggleDrawer }: DrawerListProps) => {

    return (
        <>
            <DrawerList toggleDrawer={toggleDrawer} menu={menu} menu2={menu2}/>
        </>
    );
}; 

export default AdminDrawerList;

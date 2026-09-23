import * as React from "react";
import DrawerList from "../../../admin seller/components/drawerList/DrawerList";
import { AccountBox } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const menu = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <DashboardIcon className="text-gold" />,
    activeIcon: <DashboardIcon className="text-ink" />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBagIcon className="text-gold" />,
    activeIcon: <ShoppingBagIcon className="text-ink" />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <InventoryIcon className="text-gold" />,
    activeIcon: <InventoryIcon className="text-ink" />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <AddIcon className="text-gold" />,
    activeIcon: <AddIcon className="text-ink" />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: <AccountBalanceWalletIcon className="text-gold" />,
    activeIcon: <AccountBalanceWalletIcon className="text-ink" />,
  },
  {
    name: "Transaction",
    path: "/seller/transaction",
    icon: <ReceiptIcon className="text-gold" />,
    activeIcon: <ReceiptIcon className="text-ink" />,
  },
  // {
  //   name: "Inventory",
  //   path: "/seller/inventory",
  //   icon: <MailIcon className="text-gold" />,
  //   activeIcon: <MailIcon className="text-ink" />,
  // },
];

const menu2 = [
  
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox className="text-gold" />,
    activeIcon: <AccountBox className="text-ink" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon className="text-gold" />,
    activeIcon: <LogoutIcon className="text-ink" />,
  },
];

interface DrawerListProps {
  toggleDrawer?: any;
}

const SellerDrawerList = ({ toggleDrawer }: DrawerListProps) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default SellerDrawerList;

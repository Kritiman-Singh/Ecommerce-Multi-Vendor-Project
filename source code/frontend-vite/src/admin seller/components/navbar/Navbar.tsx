import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Drawer, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../../Theme/ThemeContext';

const Navbar = ({DrawerList}:any) => {
  const navigate = useNavigate()
  const { mode, toggleMode } = useThemeMode();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: any)=>() => {
    setOpen(newOpen);

  };

  return (
    <div className='h-[10vh] flex items-center justify-between px-5 border-b border-line bg-ink/90 backdrop-blur-xl sticky top-0 z-30'>
      <div className='flex items-center gap-3 '>
        <IconButton onClick={toggleDrawer(true)} sx={{ border: "1px solid rgba(212,175,55,0.25)" }}>
          <MenuIcon className="text-gold-soft" />
        </IconButton>

        <div onClick={() => navigate("/")} className="cursor-pointer leading-none">
          <h1 className='font-display text-xl luxury-gradient-text'>Zentro</h1>
          <p className="text-[9px] tracking-[0.35em] uppercase text-muted mt-0.5">Atelier Panel</p>
        </div>
      </div>

      <IconButton
        onClick={toggleMode}
        title={mode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        sx={{ border: "1px solid rgba(212,175,55,0.25)" }}
      >
        {mode === "dark" ? (
          <LightModeIcon className="text-gold-soft" sx={{ fontSize: 20 }} />
        ) : (
          <DarkModeIcon className="text-gold-soft" sx={{ fontSize: 20 }} />
        )}
      </IconButton>

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { borderRight: "1px solid rgba(212,175,55,0.16)" } }}
      >
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>

    </div>
  )
}

export default Navbar

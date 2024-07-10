import LogoJM from "@/app/assets/images/logo-jm.png";
import Image from "next/image";
import { AccountCircleOutlined, TuneOutlined } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useState, MouseEvent } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const MenuAccount = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter()
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    Cookies.remove("auth")
    router.replace("/login")
  }
  return (
    <>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <AccountCircleOutlined />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 48 * 4.5,
              width: "11ch",
            },
          },
        }}
      >
        <MenuItem disabled>Account</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

const DefaultHeader = () => {
  return (
    <header className='header'>
      <Image src={LogoJM} className='logo' alt='Logo' />
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <MenuAccount />
        <TuneOutlined />
      </Box>
    </header>
  );
};

export default DefaultHeader;

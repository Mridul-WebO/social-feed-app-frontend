import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';

import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Auth } from '../context/AuthContext';
import CustomAlert from './CustomAlert';

export default function CustomAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [openCustomAlert, setOpenCustomAlert] = React.useState(false);

  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const { handleLoggedOutUser } = React.useContext(Auth);

  const handleLogoutPermission = () => {
    setOpenCustomAlert(true);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    handleLoggedOutUser();
    navigate('/');
    enqueueSnackbar('Logged out successfully!', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    handleMobileMenuClose();

    navigate('/profile');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      sx={{ mt: 4 }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>

      <MenuItem onClick={handleLogoutPermission}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      sx={{ mt: 4 }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          setAnchorEl(null);
          setAnchorEl(null);
          handleMobileMenuClose();
          navigate('/feed');
        }}
      >
        Feed
      </MenuItem>
      <MenuItem
        onClick={() => {
          setAnchorEl(null);
          setAnchorEl(null);
          handleMobileMenuClose();
          navigate('/feed');
        }}
      >
        Liked Posts
      </MenuItem>
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogoutPermission}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            // sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to="/feed"
              onClick={() => (document.documentElement.scrollTop = 0)}
            >
              Rituals
            </Link>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, mx: 4 }}
          >
            <Link
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 100,
                fontSize: 15,
              }}
              to="/feed"
            >
              Feed
            </Link>
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link
              style={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 100,
                fontSize: 15,
              }}
              to="/liked-posts"
            >
              Liked Posts
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      {openCustomAlert && (
        <CustomAlert
          open={openCustomAlert}
          setOpenCustomAlert={setOpenCustomAlert}
          onAgree={handleLogout}
          message={'Are you sure? You want to Logout? '}
        />
      )}
    </>
  );
}

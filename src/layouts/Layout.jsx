import { useContext } from 'react';
import CustomAppBar from '../components/CustomAppBar';
import { Auth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

const Layout = () => {
  const { isLoggedIn } = useContext(Auth);

  return (
    <>
      <Container>
        <Box>{isLoggedIn && <CustomAppBar />}</Box>
        <Box sx={{ my: 10 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;

import { CircularProgress, Container } from '@mui/material';

export const CustomLoader = () => {
  return (
    <Container sx={{ textAlign: 'center', height: '60px' }}>
      <CircularProgress />
    </Container>
  );
};

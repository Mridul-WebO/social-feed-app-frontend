import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { DevTool } from '@hookform/devtools';
import { regex } from '../../utils/helperFunctions';

import { CircularProgress, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useContext, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useLoginUserMutation } from '../../store/apis/authApi';
import { Auth } from '../../context/AuthContext';

export default function SignInPage() {
  const { enqueueSnackbar } = useSnackbar();

  const { handleLoggedInUser } = useContext(Auth);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, control, formState } = useForm();
  const { errors } = formState;
  const onSubmit = async (submittedData) => {
    try {
      const res = await loginUser(submittedData);

      if (res?.data) {
        handleLoggedInUser(res.data.data);
        navigate('/feed');

        enqueueSnackbar('Logged In successfully', {
          variant: 'success',
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar(res.error.data.message, {
          variant: 'error',
          autoHideDuration: 5000,
        });
      }
    } catch (error) {
      enqueueSnackbar("Couldn't sign in. Please try again after sometime", {
        variant: 'error',
        autoHideDuration: 5000,
      });
    }

    // navigate("/feed",{replace:true});
    // console.log({ result });

    // enqueueSnackbar('Registered user successfully! Please Sign In', {
    //   variant: 'success',
    //   autoHideDuration: 2000,
    // });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className="signInContainer"
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            margin="normal"
            variant="filled"
            size="small"
            required
            fullWidth
            name="email"
            label="Email"
            type="text"
            id="email"
            autoComplete="email"
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: regex.email,
                message: 'Please enter a valid email address',
              },
            })}
          />

          <TextField
            margin="normal"
            variant="filled"
            size="small"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="password"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            {...register('password', { required: 'Password is required' })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <VisibilityIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
          >
            {isLoading && <CircularProgress color="inherit" size={20} />}
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/sign-up" variant="body2">
                {"Don't have an account?? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <DevTool control={control} />
      </Box>
    </Container>
  );
}

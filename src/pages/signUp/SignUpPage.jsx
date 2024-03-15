/* eslint-disable no-unused-vars */
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
import { useState } from 'react';
import { useSignUpMutation } from '../../store/apis/authApi';
import { enqueueSnackbar, useSnackbar } from 'notistack';

export default function SignUpPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [signUp, { isLoading, isSuccess, isError }] = useSignUpMutation();

  const { register, handleSubmit, control, formState } = useForm();
  const { errors } = formState;
  const onSubmit = async (submittedData) => {
    const body = {
      ...submittedData,
      isPrivate: true,
    };

    try {
      const res = await signUp(body);

      if (res?.data) {
        navigate('/');
        enqueueSnackbar(
          ' Thanks for signing up. A verification link has been sent to to your email. Please check your email inbox, including the spam or junk folder, for a message from',
          {
            variant: 'success',
            autoHideDuration: 6000,
          }
        );
      } else {
        enqueueSnackbar(res.error.data.message, {
          variant: 'error',
          autoHideDuration: 5000,
        });
      }
    } catch (error) {
      enqueueSnackbar("Couldn't sign up. Please try again after sometime", {
        variant: 'error',
        autoHideDuration: 5000,
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
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
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            margin="dense"
            required
            fullWidth
            variant="filled"
            size="small"
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            type="text"
            autoFocus
            error={!!errors.firstname?.message}
            helperText={errors.firstname?.message}
            {...register('firstname', { required: 'First Name is required' })}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            variant="filled"
            size="small"
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            type="text"
            autoFocus
            error={!!errors.lastname?.message}
            helperText={errors.lastname?.message}
            {...register('lastname', { required: 'Last Name is required' })}
          />
          <TextField
            margin="dense"
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
            margin="dense"
            variant="filled"
            size="small"
            required
            fullWidth
            name="username"
            label="Username"
            type="text"
            id="username"
            autoComplete="username"
            error={!!errors.username?.message}
            helperText={errors.username?.message}
            {...register('username', { required: 'Username is required' })}
          />
          <TextField
            margin="dense"
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
            {...register('password', {
              required: 'Password is required',
              // pattern: {
              //   value: regex.password,
              //   message:
              //     "password must contains 'One UpperCase letter, One lowerCase letter and should be of atleast 8 characters'",
              // },
            })}
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/" variant="body2">
                {'Already a user? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <DevTool control={control} />
      </Box>
    </Container>
  );
}

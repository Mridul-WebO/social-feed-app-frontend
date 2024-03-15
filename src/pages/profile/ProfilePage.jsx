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
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSignUpMutation } from '../../store/apis/authApi';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import {
  useFetchUserQuery,
  useUpdateUserMutation,
} from '../../store/apis/usersApi';

export default function ProfilePage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [userData, setUserData] = useState();

  const [updateUser] = useUpdateUserMutation();

  const { data, isSuccess, isLoading } = useFetchUserQuery();

  useLayoutEffect(() => {
    setUserData(data?.data);
  }, [data]);

  const { register, handleSubmit, control, formState, setValue } = useForm({
    values: {
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      email: userData?.email,
      username: userData?.username,
    },
  });

  const { errors } = formState;
  const onSubmit = async (submittedData) => {
    const body = {
      ...submittedData,
      isPrivate: true,
    };
    console.log({ body });
    const res = await updateUser(body);
    console.log({ res });
    enqueueSnackbar('Details updated successfully', {
      variant: 'success',
      autoHideDuration: 3000,
    });
  };

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
          Profile
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            InputLabelProps={{ shrink: !isLoading && true }}
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
            InputLabelProps={{ shrink: !isLoading && true }}
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
            InputLabelProps={{ shrink: !isLoading && true }}
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
            InputLabelProps={{ shrink: !isLoading && true }}
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

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
          >
            {isLoading && <CircularProgress color="inherit" size={20} />}
            Update
          </Button>
        </Box>
        <DevTool control={control} />
      </Box>
    </Container>
  );
}

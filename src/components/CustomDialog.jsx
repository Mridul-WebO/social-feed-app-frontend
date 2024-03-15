/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Slide from '@mui/material/Slide';
import { Avatar, Box, Container, TextField } from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from 'react-hook-form';
import { useCreatePostMutation } from '../store/apis/postApi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({
  openPostModal,
  setOpenPostModal,
  setNewPosts,
}) {
  const { register, handleSubmit, formState } = useForm();

  // const { ref: registerRef, ...rest } = register('postImage');

  const imgInputRef = React.useRef(null);

  const { errors } = formState;
  const [createPost] = useCreatePostMutation();

  const [previewPostImage, setPreviewPostImage] = React.useState(null);
  const [postImage, setPostImage] = React.useState(null);

  const handlePostImageUpload = (e) => {
    setPostImage(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.addEventListener('load', () => {
      setPreviewPostImage(reader.result);
    });
    e.target.value = null;
  };

  const handleRemoveImage = () => {
    setPreviewPostImage(null);
    setPostImage(null);
    imgInputRef.current.value = null;
  };

  const onSubmit = async (submittedData) => {
    const body = {
      ...submittedData,
      image: postImage,
      isPrivate: false,
    };
    // console.log({ body });
    const res = await createPost(body);
    console.log({ res });
    setNewPosts(res?.data?.data);

    setOpenPostModal(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openPostModal}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                style={{ cursor: 'pointer' }}
                sx={{ mx: 25, width: 250, height: 100, borderRadius: 3 }}
                alt=" Sharp"
                src={previewPostImage}
              >
                <CloudUploadIcon
                  sx={{ fontSize: 50 }}
                  onClick={() => imgInputRef.current.click()}
                />
              </Avatar>
              {postImage && (
                <Button
                  sx={{ mt: 1 }}
                  variant="outlined"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </Button>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  {...register('title', { required: 'Title is required' })}
                  error={!!errors.title?.message}
                  helperText={errors.title?.message}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  autoFocus
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  error={!!errors.description?.message}
                  helperText={errors.description?.message}
                />
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  name="photoImgUpload"
                  // {...rest}
                  ref={(e) => {
                    // registerRef(e);
                    imgInputRef.current = e;
                  }}
                  onChange={handlePostImageUpload}
                  style={{ display: 'none' }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Post{' '}
                </Button>
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPostModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

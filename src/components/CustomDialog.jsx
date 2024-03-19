/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Avatar, Box, Container, DialogTitle, TextField } from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from 'react-hook-form';
import { useCreatePostMutation } from '../store/apis/postApi';

export default function CustomDialog({
  openPostModal,
  setOpenPostModal,
  setNewPosts,
}) {
  const { register, handleSubmit, formState, reset, clearErrors } = useForm();

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

    const res = await createPost(body);

    setNewPosts(res?.data?.data);

    setOpenPostModal(false);

    handleRemoveImage();
    reset();
  };

  const handleClose = () => {
    setOpenPostModal(false);
    handleRemoveImage();
    if (errors) {
      clearErrors();
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={openPostModal}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: 'center' }} id="alert-dialog-title">
          {'Create New Post'}
        </DialogTitle>
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
                sx={{
                  mx: 25,
                  width: 250,
                  height: 150,
                  borderRadius: 3,
                  border: '2px dotted gray',

                  backgroundColor: 'lightgray',
                }}
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
                id="Post-form"
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  size="small"
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
                  size="small"
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

                {/* <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Post{' '}
                </Button> */}
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" id="Post-form" onClick={handleSubmit(onSubmit)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

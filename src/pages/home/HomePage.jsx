import { Button, Container, Grid } from '@mui/material';
import Post from '../../components/Post';
import { useEffect, useState } from 'react';
import CustomDialog from '../../components/CustomDialog';
// import { Posts } from '../../context/PostsContext';
import { useFetchAllPostsQuery } from '../../store/apis/postApi';
import { enqueueSnackbar } from 'notistack';

const HomePage = () => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const { data } = useFetchAllPostsQuery();

  const [posts, setPosts] = useState();

  useEffect(() => {
    setPosts(data?.data?.data);
  }, [data]);

  const setNewPosts = (post) => {
    setPosts([post, ...posts]);

    enqueueSnackbar('Post created successfully', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  const handleCreatePost = () => {
    setOpenPostModal(true);
  };

  return (
    <>
      <Container component="main" maxWidth="mx" sx={{ mt: 8 }}>
        <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            position="fixed"
            variant="outlined"
            sx={{ my: 5, ml: 15 }}
            onClick={handleCreatePost}
          >
            +Create Post
          </Button>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {posts?.length === 0 && <h3>No posts found</h3>}
          {posts?.map((post) => {
            return (
              <Post
                key={post?._id}
                post_id={post?._id}
                desc={post.description}
                title={post.title}
                createdAt={post.createdAt}
              />
            );
          })}
        </Grid>
      </Container>
      <CustomDialog
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
        setNewPosts={setNewPosts}
      />
    </>
  );
};

export default HomePage;

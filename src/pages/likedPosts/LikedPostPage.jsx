import { Container, Grid, Typography } from '@mui/material';

import { useContext } from 'react';

import { Link } from 'react-router-dom';
import { LikedPosts } from '../../context/LikedPostContext';
import Post from '../../components/Post';

const LikedPostPage = () => {
  const { likedPosts } = useContext(LikedPosts);

  document.documentElement.scrollTop = 0;

  return (
    <>
      <Container component="main" maxWidth="mx" sx={{ mt: 8 }}>
        <Grid sx={{ display: 'flex', justifyContent: 'end' }}></Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {likedPosts?.length === 0 ? (
            <h3>
              No posts Liked yet. <Link to="/feed"> Start Exploring</Link>
            </h3>
          ) : (
            <Typography fontSize={30}>Liked Posts</Typography>
          )}

          {likedPosts?.map((post) => {
            return (
              <Post
                key={post?._id}
                post_id={post?.filePath ? post?._id : undefined}
                desc={post?.description}
                title={post?.title}
                createdAt={post?.createdAt}
                liked={true}
              />
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default LikedPostPage;

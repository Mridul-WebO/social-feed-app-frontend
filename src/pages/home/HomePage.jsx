import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Post from '../../components/Post';
import { useEffect, useRef, useState } from 'react';
import CustomDialog from '../../components/CustomDialog';
// import { Posts } from '../../context/PostsContext';
import { useFetchAllPostsQuery } from '../../store/apis/postApi';
import { enqueueSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

// import config from '../../../config';
// import { getSessionToken } from '../../utils/helperFunctions';

export const CustomLoader = () => {
  return (
    <Container sx={{ textAlign: 'center', height: '60px' }}>
      <CircularProgress />
    </Container>
  );
};

const HomePage = () => {
  const postRef = useRef(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const postPerPage = 5;

  const { data } = useFetchAllPostsQuery(pageNumber);

  useEffect(() => {
    if (data?.data?.data) {
      setPosts((prev) => [...prev, ...data.data.data]);
      setPostsCount(data.data.total);
    }
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

  const fetchMorePost = () => {
    if (parseInt(postsCount / postPerPage) === pageNumber) {
      setHasMorePosts(false);
    } else {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const callBack = () => {
      const lastCardPosition = postRef?.current?.getBoundingClientRect();
      if (
        lastCardPosition?.top + lastCardPosition?.height <
        window.innerHeight
      ) {
        window.removeEventListener('scroll', callBack);
      }
    };
    window.addEventListener('scroll', callBack);

    return () => {
      window.removeEventListener('scroll', callBack);
    };
  }, [data?.data?.data]);

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
                postRef={postRef}
                key={post?._id}
                post_id={post?._id}
                desc={post?.description}
                title={post?.title}
                createdAt={post?.createdAt}
              />
            );
          })}

          {hasMorePosts ? (
            <Button onClick={fetchMorePost}>Load More...</Button>
          ) : (
            <Typography>
              You are all caught up...
              <Link onClick={() => (document.documentElement.scrollTop = 0)}>
                Back To Top
              </Link>
            </Typography>
          )}
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

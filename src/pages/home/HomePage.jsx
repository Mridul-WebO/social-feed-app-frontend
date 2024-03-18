import { Button, CircularProgress, Container, Grid } from '@mui/material';
import Post from '../../components/Post';
import { useEffect, useRef, useState } from 'react';
import CustomDialog from '../../components/CustomDialog';
// import { Posts } from '../../context/PostsContext';
import { useFetchAllPostsQuery } from '../../store/apis/postApi';
import { enqueueSnackbar } from 'notistack';

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
  const [isLastPostVisible, setIsLastPostVisible] = useState(false);
  const [posts, setPosts] = useState([]);

  const { data } = useFetchAllPostsQuery(pageNumber, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.data?.data) {
      setPosts((prev) => [...prev, ...data.data.data]);
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

  const handleCallBack = (entries) => {
    setIsLastPostVisible(entries[0].isIntersecting);

    // console.log(entries[0]);

    // setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleCallBack, {
      threshold: 1,
    });
    if (postRef.current) observer.observe(postRef.current);

    return () => {};
  });

  const fetchMorePost = () => {};

  window.onscroll = () => {};

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
          {isLastPostVisible && (
            <Button onClick={fetchMorePost}>Load More...</Button>
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

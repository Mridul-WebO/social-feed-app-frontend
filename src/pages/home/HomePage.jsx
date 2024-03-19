import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Post from '../../components/Post';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [postsCount, setPostsCount] = useState(0);



  const { data,  isFetching } = useFetchAllPostsQuery(pageNumber, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.data?.data) {
      setPosts((prev) => [...prev, ...data.data.data]);
     setPostsCount(data.data.total)
      
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
    
    console.log(postsCount/5)
   
    if(parseInt(postsCount/5) === pageNumber){
      setIsLastPostVisible(false);
    } 
    setPageNumber(prev=>prev+1)
  }

  useEffect(()=>{
    
    const callBack = ()=>{
     
      const lastCardPosition = postRef.current.getBoundingClientRect()
        if(lastCardPosition.top + lastCardPosition.height <  window.innerHeight){
          setIsLastPostVisible(true)
        }
      }

   window.addEventListener('scroll',callBack)

   return ()=>{
    window.removeEventListener('scroll',callBack)
   }


  },[data?.total])






 




  return (
    <>
      <Container component="main" maxWidth="mx" sx={{ mt: 8 }}   >
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
          {isFetching && <CircularProgress/>}
          {isLastPostVisible ? (
            <Button onClick={fetchMorePost}>Load More...</Button>
          ):<Typography>You are all caught up...</Typography>}
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

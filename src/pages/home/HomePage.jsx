import { Button, CircularProgress, Container, Grid } from '@mui/material';
import Post from '../../components/Post';
import { useEffect, useState } from 'react';
import CustomDialog from '../../components/CustomDialog';
// import { Posts } from '../../context/PostsContext';
import { useFetchAllPostsQuery } from '../../store/apis/postApi';
import { enqueueSnackbar } from 'notistack';
import InfiniteScroll from 'react-infinite-scroll-component';
import config from '../../../config';
import { getSessionToken } from '../../utils/helperFunctions';




export const CustomLoader = ()=>{
  return(
    <Container sx={{ textAlign:'center',height:"60px"}} >

    <CircularProgress   />

    </Container>
  )
}




const HomePage = () => {
  
  const [openPostModal, setOpenPostModal] = useState(false);
  
  const { data, refetch } = useFetchAllPostsQuery(1,{refetchOnMountOrArgChange:true});
  const [pageNumber, setPageNumber] = useState(1);
  



  const [posts, setPosts] = useState([]);
  const[postsCount,setPostsCount] = useState(0);


  
  useEffect(() => {
    setPosts(data?.data?.data);
    setPostsCount(data?.data?.data?.length)
    
  }, [data]);

  
  const setNewPosts = (post) => {
  
    setPosts([post, ...posts]);
    setPageNumber(1)
    refetch()
   
    
    enqueueSnackbar('Post created successfully', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };
  
  const handleCreatePost = () => {
    setOpenPostModal(true);
  };
  
  const fetchMorePosts = async ()=>{
    console.log("Fetching more posts...")
    setPageNumber(pageNumber+ 1)
    
    
    
    const token = getSessionToken();
  

   const res =  await fetch(`${config.baseUrl}/posts/get-feed-posts?page=${pageNumber+1}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      method: "GET",
   
  })
  const jsonData = await res.json()
  const parsedData = jsonData?.data?.data;

  setPosts([...posts,...parsedData])
  setPostsCount(prev=> prev + parsedData?.length)

}





  return (
    <>
      <Container component="main" maxWidth="mx" sx={{ mt: 8,  }}>
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
          {postsCount === 0 && <h3>No posts found</h3>}
          
        
      <InfiniteScroll
     
          dataLength={posts?.length}
          next={fetchMorePosts}
          hasMore={(postsCount !== data?.data?.total)}
          loader={<CustomLoader/>}
          endMessage={postsCount && <h5>You are all caught up...</h5>}
        >


          {posts?.map((post) => {
            return (
              <Post
              key={post?._id}
              post_id={post?._id}
              desc={post?.description}
              title={post?.title}
              createdAt={post?.createdAt}
              />
              );
            })}
           
            </InfiniteScroll>
     
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

import { Button, Container, Grid } from '@mui/material';
import Post from '../../components/Post';
import { useState } from 'react';
import CustomDialog from '../../components/CustomDialog';
import { useFetchAllPostsQuery } from '../../store/apis/postApi';

const HomePage = () => {
  const [openPostModal, setOpenPostModal] = useState(false);

  const handleCreatePost = () => {
    setOpenPostModal(true);
  };

  const { data } = useFetchAllPostsQuery();
  console.log({data});

  return (
    <>
      <Container component="main" maxWidth="mx" sx={{ mt: 8 }}>
        <Grid sx={{display:'flex',justifyContent:'end'}} >
        <Button
        position="fixed"
          variant="outlined"
          sx={{ my: 5, ml: 15 }}
          onClick={handleCreatePost}
        >
          +Create Post
        </Button>

        </Grid>
        <Grid sx={{display:'flex',flexDirection:'column',alignItems:'center'}}  >
               
        {data?.data?.data.length === 0 && <h3>No posts found</h3>}
        {data?.data?.data.map((post) => {
          return (
            <Post key={post._id} desc={post.description} title={post.title} createdAt={post.createdAt} />
          );
        })}

        </Grid>
     


      
      </Container>
      <CustomDialog
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      />
    </>
  );
};

export default HomePage;

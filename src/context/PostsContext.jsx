import { createContext, useState } from 'react';
import { useFetchAllPostsQuery } from '../store/apis/postApi';
import { enqueueSnackbar } from 'notistack';

export const Posts = createContext();

// eslint-disable-next-line react/prop-types
const PostsContext = ({ children }) => {
  const { data } = useFetchAllPostsQuery();

  const [posts, setPosts] = useState(data);

  const setNewPosts = (post) => {
    setPosts(post);

    enqueueSnackbar('Post created successfully', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  return (
    <Posts.Provider value={{ posts, setNewPosts }}>{children}</Posts.Provider>
  );
};

export default PostsContext;

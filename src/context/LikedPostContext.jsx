import { createContext, useState } from 'react';

export const LikedPosts = createContext();

// eslint-disable-next-line react/prop-types
const LikedPostContext = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState([]);

  return (
    <LikedPosts.Provider value={{ likedPosts, setLikedPosts }}>
      {children}
    </LikedPosts.Provider>
  );
};

export default LikedPostContext;

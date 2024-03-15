import { createApiInstance } from './createApiInstance';

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllPosts: builder.query({
      query: () => {
        return {
          url: '/posts/get-feed-posts',
          method: 'GET',
          headers: {},
        };
      },
      providesTags: ['Post'],
    }),
    createPost: builder.mutation({
      query: (data) => {
        return {
          url: '/posts/create-post',
          method: 'POST',
          body: data,
        };
      },
      providesTags: ['Post'],
    }),
    fetchPostImg: builder.query({
      query: () => {
        return {
          url: '/posts/get-feed-image?postId=65eec2b46d9631ceeaf83b66',
          method: 'GET',
        };
      },
      providesTags: ['Post'],
    }),
  }),
});

export const {
  useFetchAllPostsQuery,
  useCreatePostMutation,
  useFetchPostImgQuery,
} = extendedApi;

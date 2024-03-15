import { createApiInstance } from './createApiInstance';

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllPosts: builder.query({
      query: () => {
        return {
          url: '/posts/get-feed-posts',
          method: 'GET',
        };
      },
      providesTags: ['Post'],
    }),
    createPost: builder.mutation({
      query: (data) => {
        const formData = new FormData();

        for (const key in data) {
          formData.append(key, data[key]);
        }

        return {
          url: '/posts/create-post',
          method: 'POST',
          body: formData,
        };
      },
      providesTags: ['Post'],
    }),
    fetchPostImg: builder.query({
      query: (postId) => {
        return {
          url: `/posts/get-feed-image?postId=${postId}`,
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

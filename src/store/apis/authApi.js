import { createApiInstance } from './createApiInstance';

const extendedAuthApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user) => {
        console.log({ user });
        return {
          url: '/sign-up',
          method: 'POST',
          body: user,
        };
      },
      invalidatesTags: ['User'],
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),

      invalidatesTags: ['User'],
    }),
  }),
});

export const { useSignUpMutation, useLoginUserMutation } = extendedAuthApi;

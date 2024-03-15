import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../../../config';
import { getSessionToken } from '../../utils/helperFunctions';

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
  prepareHeaders: (headers) => {
    const token = getSessionToken();

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// initialize an empty api service that we'll inject endpoints into later as needed
export const createApiInstance = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ['User', 'Post'],
});

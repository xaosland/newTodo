import { baseApi } from '@/services/baseApi/baseApi.services'
import {
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  GetDecksArgs,
  UpdateDeckArgs,
} from '@/services/types/task.type'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDecks: builder.mutation<Deck, CreateDeckArgs | void>({
        invalidatesTags: ['Tasks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/decks',
        }),
      }),
      delDecks: builder.mutation<void, DeleteDeckArgs>({
        invalidatesTags: ['Tasks'],
        query({ id }) {
          return {
            method: 'DELETE',
            url: `/v1/decks/${id}`,
          }
        },
      }),
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Tasks'],
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
      updateDecks: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Tasks'],
        query: ({ id, ...body }) => ({
          body,
          method: 'PATCH',
          url: `/v1/decks/${id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateDecksMutation,
  useDelDecksMutation,
  useGetDecksQuery,
  useUpdateDecksMutation,
} = decksService

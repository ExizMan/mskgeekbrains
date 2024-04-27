import { mainApi } from '@shared/lib';

export const messageApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getMessages: build.query({
            query: (id: number) => ({
                url: `/bot/api/message/${id}/get_by_chat/`,
                method: 'GET',
            }),
            providesTags: ['Messages'],
        }),
        setMessage: build.mutation<any, string>({
            query: (value: string) => ({
                url: `/bot/api/message/`,
                method: 'POST',
                body: value,
            }),
            invalidatesTags: ['Messages'],
        }),

    }),
});
export const { useLazyGetMessagesQuery, useSetMessageMutation } = messageApi;
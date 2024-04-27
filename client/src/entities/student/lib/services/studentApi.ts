import { mainApi } from '@shared/lib';

export const studentApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getMessages: build.query({
            query: (id: string) => ({
                url: `/bot/api/message/${id}`,
                method: 'GET',
            }),
        }),

    }),
});
export const { useGetMessagesQuery } = studentApi;
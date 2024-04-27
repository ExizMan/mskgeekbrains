import { mainApi } from '@shared/lib';
import { IChat } from '@entities/chat';

export const chatApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getChats: build.query<IChat[], null>({
            query: () => ({
                url: `/bot/api/chat/`,
                method: 'GET',
            }),
        }),

    }),
});
export const { useGetChatsQuery } = chatApi;
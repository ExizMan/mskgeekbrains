import { useGetChatsQuery } from '@entities/chat';

export const useGetChats = () => {
    const { data, isLoading } = useGetChatsQuery(null);
    return {
        chats: data,
        isLoading: isLoading,
    };
};
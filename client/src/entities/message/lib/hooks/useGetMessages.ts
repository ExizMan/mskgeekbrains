import { useLazyGetMessagesQuery } from '@entities/message';

export const useGetMessages = () => {
    const [chatTrigger, { data, isLoading }] = useLazyGetMessagesQuery();

    const trigger = async (id: number) => {
        if (id) {
            await chatTrigger(id);
        }
    };

    return {
        trigger,
        messages: data,
        isLoading: isLoading,
    };
};
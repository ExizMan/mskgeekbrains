import { useLazyGetMessagesQuery } from '@entities/message';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const useGetMessages = () => {
    const [chatTrigger, { data, isLoading }] = useLazyGetMessagesQuery();
    const params = useParams();
    const trigger = async (id: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (id) {
            setInterval(async () => {
                await chatTrigger(id);
            }, 1000);
        }
    };
    return {
        trigger,
        messages: data,
        isLoading: isLoading,
    };
};
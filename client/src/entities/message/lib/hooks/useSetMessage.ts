import { IMessageProps, useSetMessageMutation } from '@entities/message';

export const useSetMessage = () => {
    const [messageTrigger] = useSetMessageMutation();

    const trigger = async (value: IMessageProps) => {
        if (value) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            await messageTrigger(value);
        }
    };

    return trigger;
};
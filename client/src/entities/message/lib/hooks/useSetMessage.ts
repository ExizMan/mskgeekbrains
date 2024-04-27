import { IMessageProps, useSetMessageMutation } from '@entities/message';

export const useSetMessage = () => {
    const [messageTrigger] = useSetMessageMutation();

    const trigger = async (value: IMessageProps) => {
        if (value) {
            await messageTrigger(value);
        }
    };

    return trigger;
};
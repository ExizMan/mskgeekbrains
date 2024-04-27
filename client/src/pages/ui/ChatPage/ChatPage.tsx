import cls from './ChatPage.module.scss';
import { useParams } from 'react-router-dom';
import { IMessageCloudProps, MessageCloud, useGetMessages } from '@entities/message';
import { useEffect } from 'react';
import { Loading } from '@shared/ui';
import { ChatInput } from '@entities/chat';

export const ChatPage = () => {
    const { id } = useParams();
    const { trigger, messages } = useGetMessages();
    useEffect(() => {
        if (id) {
            trigger(+id);
        }
    }, [id]);
    if (messages) {
        return (
            <div className={cls.wrapper}>
                <div className={cls.messages}>
                    {messages.map((item: IMessageCloudProps) => (
                        <MessageCloud key={item.id} {...item} />
                    ))}
                </div>
                <ChatInput chat_id={id} usertg_id={messages[0]?.usertg_id} />
            </div>
        );
    } else {
        return <Loading />;
    }
};


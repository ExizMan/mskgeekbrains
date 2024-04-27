import cls from './Toolbar.module.scss';
import { IChat, ChatCard, useGetChats } from '@entities/chat';
import { Loading } from '@shared/ui';

export const Toolbar = () => {
    const { chats } = useGetChats();
    if (chats) {
        return (
            <div className={cls.toolbar}>
                <ul className={cls.list}>
                    {chats.map((item: IChat) => (
                        <ChatCard key={item.id} {...item} />
                    ))}
                </ul>
            </div>
        );
    } else {
        return <Loading />;
    }
};


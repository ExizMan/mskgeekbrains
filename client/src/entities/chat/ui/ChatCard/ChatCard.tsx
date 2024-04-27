import cls from './ChatCard.module.scss';
import { Text } from '@shared/ui';
import { IMessageCardProps } from '@entities/chat';
import { classNames, SizeEnum, WeightEnum } from '@shared/lib';
import { useLocation, useNavigate } from 'react-router-dom';

export const ChatCard = (
    {
        last_massage,
        id,
        username,
    }: IMessageCardProps) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return (
        <li
            onClick={() => navigate(`/${id}`)}
            className={classNames(cls.wrapper, {
                [cls.active]: pathname.includes(id.toString()),
            }, [])}>
            <div className={cls.avatar}></div>
            <div className={cls.info}>
                <Text.Paragraph size={SizeEnum.H1}>
                    {username.slice(0, 10)}...
                </Text.Paragraph>
                <Text.Paragraph
                    weight={WeightEnum.MEDIUM}
                    className={cls.lastMessage} size={SizeEnum.H4}>
                    {last_massage.length > 15 ? `${last_massage.slice(0, 15)}...` : last_massage.slice(0, 15)}
                </Text.Paragraph>
            </div>
        </li>
    );
};


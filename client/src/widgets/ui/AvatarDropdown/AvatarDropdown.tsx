import cls from './AvatarDropdown.module.scss';
import { Avatar, Text } from '@shared/ui';
import {  useState } from 'react';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';
import { useLogout } from '@features/auth';
import { useGetMe } from '@entities/user';
import { useNavigate } from 'react-router-dom';

export const AvatarDropdown = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data } = useGetMe();
    const navigate = useNavigate()
    const logout = useLogout();
    if (data) {
        return (
            <div
                onMouseEnter={() => {
                    setIsOpen(true);
                }}
                onMouseLeave={() => {
                    setIsOpen(false);
                }}
                className={cls.wrapper}>
                <Avatar />
                {isOpen &&
                    <ul className={cls.list}>
                        <li className={cls.item}>
                            <Text.Link size={SizeEnum.H3} color={ColorEnum.BLACK} to="/user">
                                {data.username}
                            </Text.Link>
                        </li>
                        <li className={cls.item}>
                            <Text.Link size={SizeEnum.H3} color={ColorEnum.BLACK} to="/user">
                                Настройки
                            </Text.Link>
                        </li>
                        <li
                            onClick={logout}
                            className={classNames(cls.item, {}, [cls.logout])}>
                            <Text.Link to="/auth" size={SizeEnum.H3} color={ColorEnum.BLACK}>
                                Выйти
                            </Text.Link>
                        </li>
                    </ul>
                }
            </div>
        );
    } else {
        return <></>;
    }
};
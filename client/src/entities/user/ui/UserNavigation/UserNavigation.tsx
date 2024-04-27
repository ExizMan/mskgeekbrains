import cls from './UserNavigation.module.scss';
import { useLocation } from 'react-router-dom';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';
import { Text } from '@shared/ui';

export const UserNavigation = () => {
    const { pathname } = useLocation();
    return (
        <ul className={cls.list}>
            <li className={cls.listItem}>
                <Text.Link className={classNames(cls.link, {
                    [cls.active]: pathname === '/user' || pathname === '/user/',
                }, [])} to={'/user'} size={SizeEnum.H3} color={ColorEnum.BLACK}>
                    Основная информация
                </Text.Link>
            </li>
            <li className={cls.listItem}>
                <Text.Link className={classNames(cls.link, {
                    [cls.active]: pathname.includes('change'),
                }, [])} to={'/user/change'} size={SizeEnum.H3} color={ColorEnum.BLACK}>
                    Настройки
                </Text.Link>
            </li>
        </ul>
    );
};
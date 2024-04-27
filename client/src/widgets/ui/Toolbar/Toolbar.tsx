import cls from './Toolbar.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';

export const Toolbar = () => {
    const list = [
        {
            link: '/',
            text: 'Главная',
        },
        {
            link: '/',
            text: 'Главная',
        },
        {
            link: '/',
            text: 'Главная',
        },
        {
            link: '/',
            text: 'Главная',
        },
        {
            link: '/',
            text: 'Главная',
        },
        {
            link: '/',
            text: 'Главная',
        },
    ];
    return (
        <div className={cls.toolbar}>
            <ul className={cls.list}>
                {list.map((item) => (
                    <li key={item.text} className={cls.listItem}>
                        <Text.Link className={cls.link} to={'/user'} size={SizeEnum.H3} color={ColorEnum.BLACK}>
                            124
                        </Text.Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};


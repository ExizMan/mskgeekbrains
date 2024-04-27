import cls from './Toolbar.module.scss';
import { Text } from '@shared/ui';

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
                        <Text.Link to={item.link}>{item.text}</Text.Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};


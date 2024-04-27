import cls from './Navbar.module.scss';
import { AvatarDropdown } from '@widgets/ui';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';

export const Navbar = () => {
    return (
        <nav className={cls.navbar}>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    <Text.Link
                        size={SizeEnum.H3}
                        color={ColorEnum.BLACK}
                        to="/statistics"
                    >Статистика</Text.Link>
                </li>
                <li className={cls.listItem}>
                    <Text.Link
                        size={SizeEnum.H3}
                        color={ColorEnum.BLACK}
                        to="/"
                    >Чаты</Text.Link>
                </li>
                <li className={cls.listItem}>
                    <AvatarDropdown />
                </li>
            </ul>
        </nav>
    );
};


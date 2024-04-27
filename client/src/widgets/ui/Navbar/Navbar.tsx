import cls from './Navbar.module.scss';
import { AvatarDropdown } from '@widgets/ui';

export const Navbar = () => {
    return (
        <nav className={cls.navbar}>
            <AvatarDropdown />
        </nav>
    );
};


import cls from './MyPage.module.scss';
import { UserChangeForm, UserNavigation } from '@entities/user';

export const MyPage = ({ disabled }: { disabled: boolean }) => {

    return (
        <div className={cls.container}>
            <div className={cls.wrapper}>
                <UserNavigation />
                <div className={cls.info}>
                    <UserChangeForm disabled={disabled} />
                </div>
            </div>
        </div>
    );
};
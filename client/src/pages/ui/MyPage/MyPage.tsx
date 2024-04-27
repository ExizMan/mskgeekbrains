import cls from './MyPage.module.scss';
import { UserChangeForm, UserNavigation } from '@entities/user';

export const MyPage = () => {

    return (
        <div className={cls.container}>
            <div className={cls.wrapper}>
                <UserNavigation />
                <div className={cls.info}>
                    <UserChangeForm disabled={true} />
                </div>
            </div>
        </div>
    );
};
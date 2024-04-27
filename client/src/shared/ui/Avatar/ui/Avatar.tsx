import cls from './Avatar.module.scss';
import { SizeEnum } from '@shared/lib';
import { Text } from '@shared/ui';
import { useGetMe } from '@entities/user';

export const Avatar = () => {
    const { data } = useGetMe();
    return (
        <div
            className={cls.avatar}
        >
            {data.avatar
                ?
                <img
                    className={cls.image}
                    src={`${import.meta.env.VITE_SERVER_FILES}/user/${data.avatar}`} alt="avatar"
                />
                :
                <div className={cls.round}>
                    <Text.Paragraph size={SizeEnum.H4}>
                        {data.username.split('')[0]}
                    </Text.Paragraph>
                </div>
            }
        </div>
    );
};
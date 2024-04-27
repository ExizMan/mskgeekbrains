import cls from './ChatsPage.module.scss';
import Chat from '@assets/icons/comments.svg';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';

export const ChatsPage = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.chat}>
                <Chat className={cls.icon}/>
                <Text.Heading
                    size={SizeEnum.H3}
                    color={ColorEnum.BLACK}
                    weight={WeightEnum.BOLD}
                    className={cls.title}
                >
                    Выберите чат
                </Text.Heading>
            </div>
        </div>
    );
};


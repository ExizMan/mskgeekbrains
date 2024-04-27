import cls from './MessageCloud.module.scss';
import { ByEnum, IMessageCloudProps } from '@entities/message';
import { Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';

export const MessageCloud = (
    {
        text,
        date,
        answer_by,
    }: IMessageCloudProps) => {
    return (
        <div className={classNames(cls.wrapper, {
            [cls.received]: answer_by === ByEnum.STUDENT,
            [cls.bot]: answer_by === ByEnum.RASA,
        }, [])}>
            <Text.Paragraph
                size={SizeEnum.H3}
                color={answer_by === ByEnum.STUDENT
                    ? ColorEnum.BLACK
                    : ColorEnum.WHITE
                }
            >
                {text}
            </Text.Paragraph>
            <Text.Paragraph
                className={cls.date}
                size={SizeEnum.H5}
                color={answer_by === ByEnum.STUDENT
                    ? ColorEnum.BLACK
                    : ColorEnum.WHITE
                }
            >
            </Text.Paragraph>
        </div>
    );
};


import cls from './ChatInput.module.scss';
import { Button, Input } from '@shared/ui';
import { useState } from 'react';
import { BorderEnum, SizeEnum } from '@shared/lib';
import Telegram from '@assets/icons/telegram.svg';
import { ByEnum, IMessageProps, useSetMessage } from '@entities/message';

export const ChatInput = ({ chat_id, usertg_id }: { usertg_id: string, chat_id: string }) => {
    const [value, setValue] = useState<string>('');
    const trigger = useSetMessage();
    return (
        <div className={cls.wrapper}>
            <Input
                border={BorderEnum.H6}
                size={SizeEnum.H3}
                className={cls.input}
                label={'Введите текст'} value={value} onChange={(event) => {
                setValue(event.target.value);
            }} />
            <Button
                onClick={() => {
                    const obj: IMessageProps = {
                        chat_id,
                        usertg_id,
                        text: value,
                        date: new Date(),
                        answer_by: ByEnum.OBSERVER,
                    };
                    trigger(obj);
                    setValue("")
                }}
                type="button"
                className={cls.button} size={SizeEnum.H5}>
                <Telegram />
            </Button>
        </div>
    );
};


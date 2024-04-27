import cls from './LoginForm.module.scss';
import { useState } from 'react';
import { ILoginRequest, useLogin } from '@features/auth/lib';
import { Button, Input, Text } from '@shared/ui';
import { BorderEnum, ColorEnum, SizeEnum } from '@shared/lib';

export const LoginForm = () => {
    const { trigger } = useLogin();
    const [data, setData] = useState<ILoginRequest>({
        username: '',
        password: '',
    });
    const handleSubmit = () => {
        trigger(data);
    };
    return (
        <form className={cls.form}>
            <Text.Heading size={SizeEnum.H2}>Авторизация</Text.Heading>
            <Input
                size={SizeEnum.H2}
                border={BorderEnum.H5}
                label={'Логин'}
                value={data.username}
                onChange={(event) => setData((prevState) => ({
                    ...prevState,
                    username: event.target.value,
                }))} />
            <Input
                type="password"
                size={SizeEnum.H2}
                border={BorderEnum.H5}
                label={'Пароль'}
                value={data.password}
                onChange={(event) => setData((prevState) => ({
                    ...prevState,
                    password: event.target.value,
                }))} />
            <Button
                onClick={handleSubmit}
                type="button"
                size={SizeEnum.H2}
                border={BorderEnum.H5}
                color={ColorEnum.WHITE}

            >Отправить</Button>
            <Text.Paragraph
                size={SizeEnum.H3}
            >
                Нет аккаунта?&nbsp;
                <Text.Link
                    size={SizeEnum.H3}
                    to="/auth/register">Создать</Text.Link>
            </Text.Paragraph>
        </form>
    );
};


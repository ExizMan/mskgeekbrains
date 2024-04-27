import cls from './RegisterForm.module.scss';
import { useState } from 'react';
import { IRegisterRequest, useRegister } from '@features/auth/lib';
import { Button, Input, Text } from '@shared/ui';
import { BorderEnum, ColorEnum, SizeEnum } from '@shared/lib';

export const RegisterForm = () => {
    const { trigger } = useRegister();
    const [data, setData] = useState<IRegisterRequest>({
        email: '',
        username: '',
        password: '',
    });
    const handleSubmit = () => {
        trigger(data);
    };
    return (
        <form className={cls.form}>
            <Text.Heading size={SizeEnum.H2}>Регистрация</Text.Heading>
            <Input
                size={SizeEnum.H2}
                border={BorderEnum.H5}
                label={'Почта'}
                value={data.email}
                onChange={(event) => setData((prevState) => ({
                    ...prevState,
                    email: event.target.value,
                }))} />
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
                type="button"
                onClick={handleSubmit}
                size={SizeEnum.H2}
                color={ColorEnum.WHITE} border={BorderEnum.H5}>Отправить</Button>
            <Text.Paragraph
                size={SizeEnum.H3}
            >
                Есть аккаунт?&nbsp;
                <Text.Link
                    size={SizeEnum.H3}
                    to="/auth/login">Войти</Text.Link>
            </Text.Paragraph>
        </form>
    );
};


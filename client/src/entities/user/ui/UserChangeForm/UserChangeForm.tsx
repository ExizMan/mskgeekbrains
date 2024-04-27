import cls from './UserChangeForm.module.scss';
import { Button, Input, Text } from '@shared/ui';
import { ChangeEvent, useEffect, useState } from 'react';
import { BorderEnum, ColorEnum, SizeEnum } from '@shared/lib';
import { toast } from 'react-toastify';
import { useGetMe } from '@entities/user/lib/hooks';
import { IUser } from '@entities/user';

export const UserChangeForm = ({ disabled }: { disabled: boolean }) => {
    const { data: user } = useGetMe();
    const [img, setImg] = useState<File | null>();
    const [data, setData] = useState<IUser>({
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        avatar: user?.avatar,
        username: user?.username,
        password: '',
        repeatPassword: '',
    });
    if (!user) {
        return (
            <div>loading...</div>
        );
    }
    const handleChange = (key: string, value: string) => {
        setData(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    // useEffect(() => {
    //     if (user) {
    //         setData({
    //             email: user?.email,
    //             firstName: user?.firstName,
    //             lastName: user?.lastName,
    //             avatar: user?.avatar,
    //             username: user?.username,
    //             password: '',
    //             repeatPassword: '',
    //         })
    //     }
    // }, [user]);
    const handleReset = () => {
        setData({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            username: user.username,
            password: '',
            repeatPassword: '',
        });
        setImg(null);
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const imageTypeRegex = /^image\//;
            if (imageTypeRegex.test(file.type)) {
                setImg(file);
                // setValue("img", file);
            } else {
                setImg(null);
                // setValue("img", null);
                toast.error('Выберите файл изображения');
            }
        }
    };
    return (
        <form className={cls.form}>
            <div className={cls.mainInfo}>
                <div className={cls.avatar}>
                    {user.avatar ? (
                        <img
                            src={`
                                    ${import.meta.env.VITE_SERVER_FILES}/user/${user.avatar}`} alt="" />
                    ) : img ? (
                        <img src={URL.createObjectURL(img)} alt="" />
                    ) : (
                        <Text.Heading size={SizeEnum.H2}
                                      color={ColorEnum.BLACK}>  {user.username && user.username[0].toUpperCase()}</Text.Heading>
                    )}
                    <input
                        onChange={handleFileChange}
                        className={cls.avatarFile} type="file" />
                </div>
                <div className={cls.info}>
                    <Text.Heading size={SizeEnum.H5} color={ColorEnum.BLACK}>Основная информация</Text.Heading>
                    <Input
                        disabled={disabled}
                        size={SizeEnum.H2}
                        border={BorderEnum.H5}
                        label={'Логин'} value={data.username} onChange={(e) => (
                        handleChange('username', e.target.value)
                    )} />
                    <Input
                        disabled={disabled}
                        size={SizeEnum.H2}
                        border={BorderEnum.H5}
                        label={'Почта'} value={data.email} onChange={(e) => (
                        handleChange('email', e.target.value)
                    )} />
                </div>
            </div>
            <div className={cls.additionalInfo}>
                <Text.Heading size={SizeEnum.H5} color={ColorEnum.BLACK}>Дополнительная информация</Text.Heading>
                <Input
                    disabled={disabled}
                    size={SizeEnum.H2}
                    border={BorderEnum.H5}
                    label={'Фамилия'} value={data.lastName} onChange={(e) => (
                    handleChange('lastName', e.target.value)
                )} />
                <Input
                    disabled={disabled}
                    size={SizeEnum.H2}
                    border={BorderEnum.H5}
                    label={'Имя'} value={data.firstName} onChange={(e) => (
                    handleChange('firstName', e.target.value)
                )} />
            </div>
            <div className={cls.passwords}>
                <Text.Heading size={SizeEnum.H5} color={ColorEnum.BLACK}>Пароль</Text.Heading>
                <Input
                    disabled={disabled}
                    size={SizeEnum.H2}
                    border={BorderEnum.H5}
                    type="password"
                    label={'Пароль'} value={data.password} onChange={(e) => (
                    handleChange('password', e.target.value)
                )} />
                <Input
                    disabled={disabled}
                    size={SizeEnum.H2}
                    border={BorderEnum.H5}
                    type="password"
                    label={'Повторите пароль'} value={data.repeatPassword} onChange={(e) => (
                    handleChange('repeatPassword', e.target.value)
                )} />

            </div>
            <div className={cls.buttons}>
                <Button
                    border={BorderEnum.H6}
                    type="button"
                    color={ColorEnum.WHITE}
                    size={SizeEnum.H3}>
                    Отправить
                </Button>
                <Button
                    bgColor={ColorEnum.DANGER}
                    border={BorderEnum.H6}
                    type="button"
                    color={ColorEnum.WHITE}
                    size={SizeEnum.H3}
                    onClick={handleReset}
                >
                    Очистить
                </Button>
            </div>
        </form>
    );
};
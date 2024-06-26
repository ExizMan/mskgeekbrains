import cls from './Input.module.scss';
import { IInputProps } from '@shared/ui/Input';
import { ChangeEvent, useEffect, useState } from 'react';
import { BorderEnum, classNames, ColorEnum, SizeEnum } from '@shared/lib';
import { Paragraph } from '@shared/ui';

export const Input = (
    {
        color = ColorEnum.BLACK,
        border = BorderEnum.H1,
        bgColor = ColorEnum.WHITE,
        value,
        size = SizeEnum.H1,
        label,
        borderColor = ColorEnum.PRIMARY,
        type,
        className,
        onChange,
        ...props
    }: IInputProps) => {

    const [inputValue, setInputValue] = useState<string>();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        onChange(event);
    };

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);


    return (
        <div className={classNames(cls.wrapper, {}, [className])}>
            <input
                type={type}
                value={inputValue}
                onChange={handleChange}
                className={classNames(cls.input, {
                    // ЦВЕТА
                    [cls.whiteBg]: bgColor === ColorEnum.WHITE,
                    [cls.blackBg]: bgColor === ColorEnum.BLACK,
                    [cls.primary]: borderColor === ColorEnum.PRIMARY,
                    [cls.secondary]: borderColor === ColorEnum.SECONDARY,
                    [cls.white] : color === ColorEnum.WHITE,
                    [cls.black] : color === ColorEnum.BLACK,
                    // РАЗМЕР
                    [cls.h1]: size === SizeEnum.H1,
                    [cls.h2]: size === SizeEnum.H2,
                    [cls.h3]: size === SizeEnum.H3,
                    [cls.h4]: size === SizeEnum.H4,
                    [cls.h5]: size === SizeEnum.H5,
                    [cls.h6]: size === SizeEnum.H6,

                    // BORDER
                    [cls.borderH1]: border === BorderEnum.H1,
                    [cls.borderH2]: border === BorderEnum.H2,
                    [cls.borderH3]: border === BorderEnum.H3,
                    [cls.borderH4]: border === BorderEnum.H4,
                    [cls.borderH5]: border === BorderEnum.H5,
                    [cls.borderH6]: border === BorderEnum.H6,
                }, [])}
                {...props}
            />
            <Paragraph

                className={cls.label}
                size={size} color={color}>
                {label}
            </Paragraph>
        </div>
    );
};


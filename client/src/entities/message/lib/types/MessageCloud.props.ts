import { DetailedHTMLProps, HTMLAttributes } from 'react';


export enum ByEnum {
    OBSERVER = 'observer',
    STUDENT = 'student',
    RASA = 'rasa',
}

export interface IMessageCloudProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>, "id"> {
    text: string;
    date: string;
    answer_by: ByEnum;
    id: string;
}
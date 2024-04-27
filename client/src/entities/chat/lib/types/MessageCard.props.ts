import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IMessageCardProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>, 'id'> {
    id: number;
    last_massage: string;
    username: string;
}

export interface IChat {
    id: number;
    last_massage: string;
    username: string;
    usertg_id: number;
    observer_id: number;
}
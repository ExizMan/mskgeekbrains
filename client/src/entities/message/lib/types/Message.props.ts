import { ByEnum } from '@entities/message';

export interface IMessageProps {
    text: string;
    chat_id: string;
    usertg_id: string;
    date: Date;
    answer_by: ByEnum
}
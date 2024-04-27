import { setUser, useGetMeQuery } from '@entities/user';
import { useEffect } from 'react';
import { useAppDispatch } from '@shared/lib';

export const useGetMe = () => {
    const { data, isLoading } = useGetMeQuery(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data) {
            console.log(data);
            dispatch(setUser(data));
        }
    }, []);
    return {
        data,
        isLoading,
    };
};
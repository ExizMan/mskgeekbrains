import { useAppDispatch } from '@shared/lib';
import { authLogout, useLazyLogoutQuery } from '@features/auth';
import { userLogout } from '@entities/user';

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const [trigger] = useLazyLogoutQuery();
    return () => {
        trigger(null);
        localStorage.removeItem('accessToken');
        dispatch(authLogout());
        dispatch(userLogout());
        setTimeout(() => {
            window.location.reload();
        }, 200);
    };
};
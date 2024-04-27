import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { classNames, Theme, useTheme } from '@shared/lib';
import { ToastContainer } from 'react-toastify';
import { useGetMe } from '@entities/user';

interface IAppProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

export const App = ({ children }: IAppProps) => {
    const { theme } = useTheme();
    const {data} = useGetMe()
    return <div className={classNames('app', {}, [theme])}>
        <ToastContainer
            style={{ zIndex: 10000000 }}
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme === Theme.LIGHT ? 'light' : 'dark'}
        />
        {children}
    </div>;
};
import cls from './RouterProvider.module.scss';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { LoginPage, ChatPage, MyPage, RegisterPage } from '@pages/ui';
import { ReactNode } from 'react';
import { Navbar, Toolbar } from '@widgets/ui';

export const Provider = ({ children }: { children: ReactNode }) => (
    <>
        <Navbar />
        <div className={cls.wrapper}>
            <Toolbar />
            {children}
        </div>
    </>
);
export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <Provider><ChatPage /></Provider>,
            },

            {
                path: 'user',
                children: [
                    {
                        index: true,
                        element: <>
                            <Navbar />
                            <MyPage />
                        </>,
                    },
                ],
            },
            {
                path: 'auth',
                children: [
                    {
                        index: true,
                        loader: async () => redirect('/auth/login'),
                    },
                    {
                        path: 'login',
                        element: <LoginPage />,
                    },
                    {
                        path: 'register',
                        element: <RegisterPage />,
                    },
                ],
            },
        ],

    },
]);
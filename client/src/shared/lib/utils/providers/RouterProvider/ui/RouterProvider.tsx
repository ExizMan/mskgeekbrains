import cls from './RouterProvider.module.scss';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { LoginPage, ChatsPage, MyPage, RegisterPage, ChatPage, ChartsPage } from '@pages/ui';
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
                element: <Provider><ChatsPage /></Provider>,
            },
            {
                path: ':id',
                element: <Provider><ChatPage /></Provider>,
            },
            {
                path: 'statistics',
                element: <><Navbar /><ChartsPage /></>,
            },
            {
                path: 'user',
                children: [
                    {
                        index: true,
                        element: <>
                            <Navbar />
                            <MyPage disabled={true} />
                        </>,
                    },
                    {
                        path: 'change',
                        element: <>
                            <Navbar />
                            <MyPage disabled={false} />
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
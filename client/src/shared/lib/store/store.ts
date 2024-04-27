import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from '@shared/lib';
import authSlice from '@features/auth/lib/features/authSlice.ts';
import userSlice from '@entities/user/lib/features/userSlice.ts';

export const store = configureStore({
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer,
        auth: authSlice,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mainApi.middleware),
    devTools: true,
});

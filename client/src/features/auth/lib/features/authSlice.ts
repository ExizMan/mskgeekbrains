import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@shared/lib';


interface initialState {
    accessToken: string,
}

const intitialState: initialState = {
    accessToken: '',
};
const authSlice = createSlice({
    name: 'auth',
    initialState: intitialState,
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        authLogout: () => intitialState,
    },
});
export const { setToken, authLogout } = authSlice.actions;
export default authSlice.reducer;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@shared/lib';


interface initialState {
    user: {
        avatar: string;
        username: string
        firstName: string
        lastName: string
    },
}

const intitialState: initialState = {
    user: {
        avatar: '',
        username: '',
        firstName: '',
        lastName: '',
    },
};
const userSlice = createSlice({
    name: 'user',
    initialState: intitialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        userLogout: () => intitialState,
    },
});
export const { setUser, userLogout } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.user;

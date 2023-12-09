import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEYS } from '../models/constants';

export interface UserState {
    name: string | null
    info: string | null
}

const initialState: UserState = {
    name: '',
    info: ''
};

const saveToLocalStorage = ({ key, value }: {
    key: LOCAL_STORAGE_KEYS,
    value: string
}) => {
    localStorage.setItem(key, value);
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            saveToLocalStorage({ key: LOCAL_STORAGE_KEYS.AUTHOR_NAME, value: action.payload });
        },
        changeInfo: (state, action: PayloadAction<string>) => {
            state.info = action.payload;
            saveToLocalStorage({ key: LOCAL_STORAGE_KEYS.AUTHOR_INFO, value: action.payload });
        },
    },
});

export const { changeInfo, changeName } = userSlice.actions;

export default userSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from '../../widgets/model/auth/authSlice';
import chatsSlice from '../../widgets/model/chats/chatsSlice';
import messagesSlice from '../../widgets/model/messages/messagesSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        chats: chatsSlice,
        messages: messagesSlice
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
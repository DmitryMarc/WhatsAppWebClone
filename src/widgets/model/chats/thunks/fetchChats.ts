import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatsAPI } from "../../..";
import { fetchAvatar } from "./fetchAvatar";
import { AuthDataType } from "../../../../shared/types";

export const fetchChats = createAsyncThunk(
    'chats/fetchChats',
    async (authData: AuthDataType, { dispatch }) => {
        let response = await chatsAPI.getContacts(authData);
        console.log(response);
        
        let i = 0;
        if (Array.isArray(response)) {
            const setIntervalId = setInterval(() => {
                if (i < response.length && i < 3) { //Ограничил до 3 обходов, чтобы запросы не исчерпались быстро
                    dispatch(fetchAvatar({ userId: response[i].id, authData }));
                }
                i++;
            }, 1000);

            const setTimeoutId = setTimeout(() => {
                clearInterval(setIntervalId);
                clearInterval(setTimeoutId);
            }, response.length * 1000)
        }
        return response;
    }
)
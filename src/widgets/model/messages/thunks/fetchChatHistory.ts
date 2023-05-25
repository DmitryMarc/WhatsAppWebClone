import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesAPI } from "../../..";
import { getLastMessage } from "./getLastMessage";
import { AuthDataType } from "../../auth/authSlice";

export const fetchChatHistory = createAsyncThunk(
    'messages/fetchChatHistory',
    async ({chatId, isFirstChat, authData}:{chatId: string, isFirstChat: boolean, authData: AuthDataType}, {dispatch}) => {
        const response = await messagesAPI.getChatHistory(chatId, authData);

        if(Array.isArray(response) && isFirstChat){
            dispatch(getLastMessage(authData));
        }
        return response;
    }
)
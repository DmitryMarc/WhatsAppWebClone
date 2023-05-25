import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesAPI } from "../../..";
import { AuthDataType } from "../../auth/authSlice";

type sendMessagePropsType = {
    chatId: string, 
    message: string,
    authData: AuthDataType
}

export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async ({chatId, message, authData}: sendMessagePropsType) => {
        const response = await messagesAPI.sendMessage(chatId, message, authData);
        return response;
    }
)
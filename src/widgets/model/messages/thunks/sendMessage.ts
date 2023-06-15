import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesAPI } from "../../..";
import { AuthDataType } from "../../../../shared/types";

type ArgType = {
    chatId: string,
    message: string,
    authData: AuthDataType
}

export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async ({ chatId, message, authData }: ArgType) => {
        const response = await messagesAPI.sendMessage(chatId, message, authData);
        return response;
    }
)
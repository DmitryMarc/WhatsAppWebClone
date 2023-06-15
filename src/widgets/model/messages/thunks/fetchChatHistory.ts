import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesAPI } from "../../..";
import { getLastMessage } from "./getLastMessage";
import { AuthDataType } from "../../../../shared/types";

type ArgType = {
    chatId: string,
    isFirstChat: boolean,
    authData: AuthDataType
}

export const fetchChatHistory = createAsyncThunk(
    'messages/fetchChatHistory',
    async ({ chatId, isFirstChat, authData }: ArgType, { dispatch }) => {
        const response = await messagesAPI.getChatHistory(chatId, authData);
        debugger;
        if (Array.isArray(response) && isFirstChat) {
            dispatch(getLastMessage(authData));
        }
        return response;
    }
)
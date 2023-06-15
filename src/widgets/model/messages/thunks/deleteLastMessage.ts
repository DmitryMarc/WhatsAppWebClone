import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesAPI } from "../../..";
import { getLastMessage } from "./getLastMessage";
import { AuthDataType } from "../../../../shared/types";

type ArgType = {
    receiptId: number,
    authData: AuthDataType
}

export const deleteLastMessage = createAsyncThunk(
    'messages/deleteLastMessage',
    async ({ receiptId, authData }: ArgType, { dispatch }) => {
        const response = await messagesAPI.deleteNotification(receiptId, authData);
        if (response.result) {
            dispatch(getLastMessage(authData));
        } else {
            dispatch(deleteLastMessage({ receiptId, authData }));
        }
        return response;
    }
)
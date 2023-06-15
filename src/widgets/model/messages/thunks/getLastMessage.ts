import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesAPI } from "../../..";
import { deleteLastMessage } from "./deleteLastMessage";
import { AuthDataType } from "../../../../shared/types";

export const getLastMessage = createAsyncThunk(
    'messages/getLastMessage',
    async (authData: AuthDataType, { dispatch }) => {
        const response = await messagesAPI.receiveNotification(authData);
        if (response) {
            dispatch(deleteLastMessage({ receiptId: response.receiptId, authData }));
        } else {
            dispatch(getLastMessage(authData));
        }
        return response;
    }
)
import { AuthDataType } from './../../auth/authSlice';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesAPI } from "../../..";
import { getLastMessage } from "./getLastMessage";

export const deleteLastMessage = createAsyncThunk(
    'messages/deleteLastMessage',
    async ({receiptId, authData} : {receiptId: number, authData: AuthDataType}, {dispatch}) => {
        const response = await messagesAPI.deleteNotification(receiptId, authData);
        if(response.result){
            dispatch(getLastMessage(authData));
        } else {
            dispatch(deleteLastMessage({receiptId, authData}));
        }
        return response;
    }
)
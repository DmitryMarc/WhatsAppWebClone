import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatsAPI } from "../../..";
import { AuthDataType } from "../../auth/authSlice";

export const fetchAvatar = createAsyncThunk(
    'chats/fetchAvatars',
    async ({userId, authData}:{userId: string, authData: AuthDataType}) => {
        const response = await chatsAPI.getAvatar(userId, authData);
        return {userId, ...response};
    }
)

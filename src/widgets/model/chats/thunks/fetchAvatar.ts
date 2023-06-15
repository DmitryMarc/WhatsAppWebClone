import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatsAPI } from "../../..";
import { AuthDataType } from "../../../../shared/types";

type ArgType = {
    userId: string,
    authData: AuthDataType
}
export const fetchAvatar = createAsyncThunk(
    'chats/fetchAvatars',
    async ({ userId, authData }: ArgType) => {
        const response = await chatsAPI.getAvatar(userId, authData);
        return { userId, ...response };
    }
)

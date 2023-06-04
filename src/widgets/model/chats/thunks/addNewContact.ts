import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatsAPI } from "../../..";
import { setSelectedItem } from "../chatsSlice";
import { AuthDataType } from "../../auth/authSlice";
import { AxiosError } from "axios";

export const addNewContact = createAsyncThunk(
    'chats/addNewContact',
    async ({contact, authData}: {contact: string, authData: AuthDataType}, {dispatch, rejectWithValue}) => {
        try {
            let newContact = `${contact}@c.us`;
            if (newContact.substring(0, 1) === '+'){
                newContact = `7${newContact.slice(2)}`;
            } else if (newContact.substring(0, 1) === '8') {
                newContact = `7${newContact.slice(1)}`;
            } 
            const response = await chatsAPI.getContactInfo(newContact, authData);
            if(response){
                dispatch(setSelectedItem(newContact));
            }
            return {contact, ...response};
        } catch (error) {
            if (error instanceof AxiosError){
                const errorCode = error.response?.status;
                return rejectWithValue(errorCode);
            }
            throw error;
        }
    }
)
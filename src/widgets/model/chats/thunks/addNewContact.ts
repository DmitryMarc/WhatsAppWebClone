import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatsAPI } from "../../..";
import { setSelectedItem } from "../chatsSlice";
import { AuthDataType } from "../../auth/authSlice";

export const addNewContact = createAsyncThunk(
    'chats/addNewContact',
    async ({contact, authData}: {contact: string, authData: AuthDataType}, {dispatch}) => {
        let newContact = `${contact}@c.us`;
        if (newContact.substring(0, 1) === '+'){
            newContact = newContact.slice(1);
        } else if (newContact.substring(0, 1) === '8') {
            newContact = `7${newContact.slice(1)}`;
        } 
        const response = await chatsAPI.getContactInfo(newContact, authData);
        if(response){
            dispatch(setSelectedItem(newContact));
        }
        return {contact, ...response};
    }
)

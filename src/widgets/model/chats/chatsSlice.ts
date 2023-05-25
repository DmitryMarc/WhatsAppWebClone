import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatType } from "../../api/chatsApi";
import { addNewContact } from "./thunks/addNewContact";
import { fetchAvatar } from "./thunks/fetchAvatar";
import { fetchChats } from "./thunks/fetchChats";

export type AvatarType = {
    userId: string,
    existsWhatsapp?: boolean,
    urlAvatar: string
}

type ChatsStateType = {
    items: ChatType[],
    itemsInfo: AvatarType[],
    statusItems: Status,
    selectedItemId: string | null
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export const initialState: ChatsStateType= {
    items: [],
    itemsInfo: [],
    statusItems: Status.LOADING,
    selectedItemId: null
}

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setSelectedItem(state, action: PayloadAction<string>) {  
            const found = state.items.find(item => item.id === action.payload);
            if (found){
                const filtered = state.items.filter(item => item.id !== found?.id);
                state.items = [found, ...filtered];
            }
            state.selectedItemId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChats.pending, (state) => {
            state.statusItems = Status.LOADING;
            state.items = [];
            console.log('Идёт отправка');
        });
        builder.addCase(fetchChats.fulfilled, (state, action) => {
            state.items = action.payload;
            state.statusItems = Status.SUCCESS;
            console.log('Чаты получены');
        });
        builder.addCase(fetchChats.rejected, (state) => {
            state.statusItems = Status.ERROR;
            state.items = [];
            console.log('Была ошибка');
        });


        builder.addCase(fetchAvatar.pending, () => {
            console.log('Идёт отправка');
        });
        builder.addCase(fetchAvatar.fulfilled, (state, action) => {
            state.itemsInfo.push(action.payload);
            console.log('Аватар получен');
        });
        builder.addCase(fetchAvatar.rejected, () => {
            console.log('Была ошибка');
        });


        builder.addCase(addNewContact.pending, () => {
            console.log('Идёт отправка');
        });
        builder.addCase(addNewContact.fulfilled, (state, action) => {
            const {contact, chatId, avatar} = action.payload;
            const foundMatch = state.items.find(item => item.id === chatId)
            if(!foundMatch){
            const newItem = {
                id: chatId,
                name: contact
            }
            const itemInfo = {
                userId: chatId,
                urlAvatar: avatar
            }
            state.items.unshift(newItem);
            state.itemsInfo.unshift(itemInfo);
            console.log(state, 'Новый чат добавлен');
            } 
        });
        builder.addCase(addNewContact.rejected, () => {
            console.log('Была ошибка');
        });
    }
})

export const { setSelectedItem } = chatsSlice.actions

export default chatsSlice.reducer
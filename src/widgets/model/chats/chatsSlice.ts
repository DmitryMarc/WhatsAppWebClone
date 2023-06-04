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

export type AddingContactType = {
    status: Status,
    error: string | undefined
}

type ChatsStateType = {
    items: ChatType[],
    itemsInfo: AvatarType[],
    statusItems: Status,
    selectedItemId: string | null,
    addingСontact: AddingContactType
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
    selectedItemId: null,
    addingСontact: {
        status: Status.LOADING,
        error: undefined
    }
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
        setAddingContactError(state, action: PayloadAction<AddingContactType>){
            state.addingСontact.error = action.payload.error;
            state.addingСontact.status = action.payload.status;
        }
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
            state.addingСontact.status = Status.SUCCESS;
            state.addingСontact.error = undefined;

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
        builder.addCase(addNewContact.rejected, (state, action) => {
            console.log('Была ошибка');
            state.addingСontact.status = Status.ERROR;
            const errorCode = action.payload;
            switch(errorCode){
                case 500: {
                    state.addingСontact.error = '*Серверная ошибка.';
                    break;
                };
                case 466: {
                    state.addingСontact.error = '*Исчерпан лимит запросов';
                    break;
                };
                case 401:
                case 400: {
                    state.addingСontact.error = '*Пользователь не авторизован';
                    break;
                };
            }
        });
    }
})

export const { setSelectedItem, setAddingContactError } = chatsSlice.actions

export default chatsSlice.reducer
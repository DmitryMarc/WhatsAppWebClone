import { createSlice } from "@reduxjs/toolkit";
import { deleteLastMessage } from "./thunks/deleteLastMessage";
import { fetchChatHistory } from "./thunks/fetchChatHistory";
import { getLastMessage } from "./thunks/getLastMessage";
import { sendMessage } from "./thunks/sendMessage";

export type MessageType = {
    type: 'outgoing' | 'incoming',
    idMessage: string,
    chatId: string,
    senderId: string,
    typeMessage: 
        'textMessage' | 
        'imageMessage' | 
        'videoMessage' | 
        'documentMessage' | 
        'audioMessage' | 
        'locationMessage' | 
        'contactMessage' | 
        'extendedTextMessage',
    textMessage: string
}

type MessagesStateType = {
    chatHistory: MessageType[],
    status: Status
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export const initialState: MessagesStateType= {
    chatHistory: [],
    status: Status.LOADING
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChatHistory.pending, (state) => {
            state.status = Status.LOADING;
            state.chatHistory = [];
            console.log('Идёт отправка');
        });
        builder.addCase(fetchChatHistory.fulfilled, (state, action) => {
            state.chatHistory = action.payload.reverse();
            state.status = Status.SUCCESS;
            console.log('Получена история сообщений');
        });
        builder.addCase(fetchChatHistory.rejected, (state) => {
            state.status = Status.ERROR;
            console.log('Была ошибка');
        });


        builder.addCase(sendMessage.pending, () => {
            console.log('Идёт отправка');
        });
        builder.addCase(sendMessage.fulfilled, () => {
            console.log('Сообщение отправлено');
        });
        builder.addCase(sendMessage.rejected, () => {
            console.log('Была ошибка');
        });


        builder.addCase(getLastMessage.pending, () => {
            console.log('Идёт отправка');
        });
        builder.addCase(getLastMessage.fulfilled, (state, action) => {
            if (action.payload){
                const {idMessage, senderData, messageData} = action.payload.body;
                const newItem: MessageType = {
                    type: senderData.chatId === senderData.sender ? 'incoming' : 'outgoing',
                    idMessage: idMessage,
                    chatId: senderData.chatId,
                    senderId: senderData.sender,
                    typeMessage: messageData.typeMessage,
                    textMessage: messageData.typeMessage === 'extendedTextMessage' 
                        ? messageData.extendedTextMessageData.text 
                        : messageData.textMessageData.textMessage,
                }
                state.chatHistory.push(newItem);
                console.log('Новое сообщение получено');
            } else {
                console.log('Нет новых сообщений');
            }
        });
        builder.addCase(getLastMessage.rejected, () => {
            console.log('Была ошибка');
        });


        builder.addCase(deleteLastMessage.pending, () => {
            console.log('Идёт отправка');
        });
        builder.addCase(deleteLastMessage.fulfilled, () => {
            console.log('Последнее полученное сообщение удалено из очереди');
        });
        builder.addCase(deleteLastMessage.rejected, () => {
            console.log('Была ошибка');
        });
    }
})

export default messagesSlice.reducer
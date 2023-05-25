import { AuthDataType } from "../model/auth/authSlice";
import { instanceApi } from "./consts/intanceApi";

type MessageType = {
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

type SentMessageType = {
    idMessage: string
}


type messageDataText = {
    typeMessage: 'textMessage',
    textMessageData: {
        textMessage: string
    }
}

type messageDataExtendedText = {
    typeMessage: 'extendedTextMessage',
    extendedTextMessageData: {
        text: string
    }
}

type ReceiveNotification = {
    receiptId: number,
    body: {
        idMessage: string,
        senderData: {
            chatId: string,
            sender: string,
            senderName: string
        },
        messageData: messageDataText | messageDataExtendedText
    }
}

type DeleteNotification = {
    result: boolean
}

export const messagesAPI = {
    async sendMessage(chatId: string, message: string, authData: AuthDataType) {
        const { idInstance, apiTokenInstance } = authData;
        return instanceApi.post<SentMessageType>(`waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
            chatId,
            message
        }).then(response => response.data);
    },
    async getChatHistory(chatId: string, authData: AuthDataType, count: number = 50) {
        const { idInstance, apiTokenInstance } = authData;
        return instanceApi.post<MessageType[]>(`waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`, {
            chatId,
            count
        }).then(response => response.data);
    },
    async receiveNotification(authData: AuthDataType) {
        const { idInstance, apiTokenInstance } = authData;
        return instanceApi.get<ReceiveNotification>(`waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
            .then(response => response.data);
    },
    async deleteNotification(receiptId: number, authData: AuthDataType) {
        const { idInstance, apiTokenInstance } = authData;
        return instanceApi.delete<DeleteNotification>(`waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`)
            .then(response => response.data);
    }
}
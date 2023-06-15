import { AuthDataType, ChatType } from '../../shared/types';
import { instanceApi } from './consts/intanceApi';

export type ChatExtendType = {
    chatId: string,
    name: string,
    avatar: string,
}

type ChatInfoType = {
    existsWhatsapp: boolean,
    urlAvatar: string
}

export const chatsAPI = {
    async getContacts(authData: AuthDataType) {
        const { idInstance, apiTokenInstance } = authData;
        return instanceApi.get<ChatType[]>(`waInstance${idInstance}/GetContacts/${apiTokenInstance}`)
            .then(response => response.data);
    },
    async getContactInfo(chatId: string, authData: AuthDataType) {
        const { idInstance, apiTokenInstance } = authData;
        return instanceApi.post<ChatExtendType>(`waInstance${idInstance}/getContactInfo/${apiTokenInstance}`, {
            chatId
        }).then(response => response.data);
    },
    async getAvatar(chatId: string, authData: AuthDataType) {
        const { idInstance, apiTokenInstance } = authData;
        return instanceApi.post<ChatInfoType>(`waInstance${idInstance}/GetAvatar/${apiTokenInstance}`, {
            chatId
        }).then(response => response.data);
    }
}
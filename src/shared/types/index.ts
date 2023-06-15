export type AuthDataType = {
    idInstance: string,
    apiTokenInstance: string
}

export type AvatarType = {
    userId: string,
    existsWhatsapp?: boolean,
    urlAvatar: string
}

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

export type ChatType = {
    id: string,
    name: string,
    type?: string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

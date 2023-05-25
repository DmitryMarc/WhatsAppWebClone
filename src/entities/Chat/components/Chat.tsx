import { AnyAction } from '@reduxjs/toolkit'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar } from '../../../shared'
import { ChatType } from '../../../widgets/api/chatsApi'
import { AvatarType } from '../../../widgets/model/chats/chatsSlice'
import styles from './Chat.module.scss'

type ChatPropsType = {
    chatData: ChatType
    selectedChatId: string | null,
    setSelectedChatId: (id: string) => AnyAction,
    chatsAvatars: AvatarType[]
}

export const Chat: FC<ChatPropsType> = (props) => {
    const {chatData, selectedChatId, setSelectedChatId, chatsAvatars} = props;
    const {id, name} = chatData;
    const dispatch = useDispatch();
    const [currentAvatar, setCurrentAvatar] = useState<AvatarType | undefined>(undefined);

    useEffect(()=>{
        if (chatsAvatars.length){
            const found = chatsAvatars.find(item => item.userId === id);
            if (found){
                setCurrentAvatar(found)
            }
        }
    },[chatsAvatars])
    return (
        <div 
            className={`${styles.chat} ${id === selectedChatId && styles.active}`} 
            onClick={() => {dispatch(setSelectedChatId(id))}}
        >
            <Avatar urlAvatar={currentAvatar?.urlAvatar} name={name} />
            <div className={styles.info}>
                <span className={styles.contact}>{name}</span>
            </div>
        </div>
    )
}

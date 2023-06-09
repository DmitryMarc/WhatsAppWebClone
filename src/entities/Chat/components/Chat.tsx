import { AnyAction } from '@reduxjs/toolkit'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar } from '../../../shared'
import styles from './Chat.module.scss'
import { AvatarType, ChatType } from '../../../shared/types'
import emptyUserIcon from '../../../shared/assets/img/user-empty.svg'

type ChatPropsType = {
    chatData: ChatType
    selectedChatId: string | null,
    setSelectedChatId: (id: string) => AnyAction,
    chatsAvatars: AvatarType[]
}

export const Chat: FC<ChatPropsType> = (props) => {
    const { chatData, selectedChatId, setSelectedChatId, chatsAvatars } = props;
    const { id, name } = chatData;
    const dispatch = useDispatch();
    const [currentAvatar, setCurrentAvatar] = useState<AvatarType | undefined>(undefined);

    useEffect(() => {
        if (chatsAvatars.length) {
            const found = chatsAvatars.find(item => item.userId === id);
            if (found) {
                setCurrentAvatar(found)
            }
        }
    }, [chatsAvatars])
    return (
        <div
            className={`${styles.chat} ${id === selectedChatId && styles.active}`}
            onClick={() => { dispatch(setSelectedChatId(id)) }}
        >
            <Avatar urlAvatar={currentAvatar?.urlAvatar || emptyUserIcon} name={name} />
            <div className={styles.info}>
                <span className={styles.contact}>{name || `+${id.slice(0,-5)}`}</span>
            </div>
        </div>
    )
}

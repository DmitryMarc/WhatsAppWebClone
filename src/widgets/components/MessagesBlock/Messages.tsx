import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../app/model/appStore'
import sendMessageIcon from '../../../assets/img/send.svg'
import { Bottombar } from '../../../entities/Bottombar'
import { Message } from '../../../entities/Message'
import { Topbar } from '../../../entities/Topbar'
import { Button, InputField } from '../../../shared'
import { selectAuthData } from '../../model/auth/selectors'
import { selectChats, selectCurrentItemId, selectItemsInfo } from '../../model/chats/selectors'
import { selectChatHistory } from '../../model/messages/selectors'
import { fetchChatHistory } from '../../model/messages/thunks/fetchChatHistory'
import { sendMessage } from '../../model/messages/thunks/sendMessage'

import styles from './Messages.module.scss'

export const Messages = () => {
    const [writtenText, setWrittenText] = useState('');
    const [isSent, setIsSent] = useState(false);
    const isFirstChat = useRef(true);
    const chatBodyEnd = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const chatsInfo = useSelector(selectItemsInfo);
    const selectedChatId = useSelector(selectCurrentItemId);
    const chatsItems = useSelector(selectChats);
    const chatMessages = useSelector(selectChatHistory);
    const authData = useSelector(selectAuthData);

    const currentChatInfo = chatsInfo.find(item => item.userId === selectedChatId);
    const currentChat = chatsItems.find(item => item.id === selectedChatId);

    useEffect(() => {
        if (selectedChatId) {
            if (isFirstChat.current) {
                dispatch(fetchChatHistory({ chatId: selectedChatId, isFirstChat: isFirstChat.current, authData}));
                isFirstChat.current = false;
            } else {
                dispatch(fetchChatHistory({ chatId: selectedChatId, isFirstChat: isFirstChat.current, authData }));
            }
        }
    }, [selectedChatId])

    useEffect(() => {
        if (isSent && selectedChatId) {
            dispatch(sendMessage({
                chatId: selectedChatId,
                message: writtenText,
                authData
            }));
        }
        setIsSent(false);
        setWrittenText('');
    }, [isSent])

    useEffect(() => {
        chatBodyEnd.current?.scrollIntoView({behavior: 'auto'});
    }, [chatMessages])

    return (
        <div className={styles.messages}>
            <Topbar locationStyle={'messages'} 
                currentChatAvatar={currentChatInfo?.urlAvatar} 
                chatName={currentChat?.name} 
                selectedChatId={selectedChatId} 
            />
            <div className={styles.content}>
                <div className={styles.list}>
                    {
                        chatMessages.map(message => <Message key={message.idMessage} message={message} />)
                    }
                </div>
                <div ref={chatBodyEnd}></div>
            </div>
            <Bottombar>
                <InputField 
                    placeholder={'Введите сообщение'} 
                    text={writtenText} 
                    setText={setWrittenText} 
                    setIsSent={setIsSent}
                />
                <Button 
                    setIsClicked={setIsSent} 
                    isFilledField={!!writtenText} 
                    iconUrl={sendMessageIcon}
                    alt="send message"
                />
            </Bottombar>
        </div>
    )
}

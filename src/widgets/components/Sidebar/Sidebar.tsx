import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../app/model/appStore"
import { Chat } from '../../../entities/Chat'
import { Topbar } from "../../../entities/Topbar"
import { AddContactBtn, InputField } from "../../../shared"
import { setSelectedItem } from "../../model/chats/chatsSlice"
import { selectChats, selectCurrentItemId, selectItemsInfo } from "../../model/chats/selectors"
import { addNewContact } from "../../model/chats/thunks/addNewContact"
import { fetchChats } from "../../model/chats/thunks/fetchChats"
import styles from './Sidebar.module.scss'
import { selectAuthData } from "../../model/auth/selectors"

export const Sidebar = () => {
    const [newContact, setNewContact] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    const isMounted = useRef(false);
    const chatsTop = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch();
    const selectedChatId = useSelector(selectCurrentItemId);
    const chats = useSelector(selectChats);
    const chatsAvatars = useSelector(selectItemsInfo);
    const authData = useSelector(selectAuthData);

    useEffect(()=>{
        if (!isMounted.current){
            dispatch(fetchChats(authData));
        }
        isMounted.current = true
    },[])

    useEffect(() => {
        if(newContact){
            if (newContact.length === 11 || newContact.length === 12){
                dispatch(addNewContact({contact: newContact, authData}));
            }
        }
        setNewContact('')
        setIsAdded(false);
    }, [isAdded])

    useEffect(() => {
        chatsTop.current?.scrollTo(0, 0)
    }, [chats])

    return (
        <div className={styles.sidebar}>
            <Topbar>
                <InputField 
                    placeholder={'Добавьте контакт'} 
                    text={newContact} setText={setNewContact} 
                    setIsSent={setIsAdded} 
                />
                <AddContactBtn setIsAdded={setIsAdded} />
            </Topbar>
            {/* ЗАСУНУТЬ В МАПЕР */}
                <div className={styles.chats} ref={chatsTop}>
                    {!!chats?.length && chats.map((item) => (
                        <Chat 
                            key={item.id} 
                            chatData={item} 
                            selectedChatId={selectedChatId} 
                            setSelectedChatId={setSelectedItem} 
                            chatsAvatars={chatsAvatars} 
                        />
                        ))
                    }
                </div>
        </div>
    )
}
//!todo
// ГЛОБАЛЬНЫЕ ТИПЫ ВЫНЕСТИ ИЗ SRC

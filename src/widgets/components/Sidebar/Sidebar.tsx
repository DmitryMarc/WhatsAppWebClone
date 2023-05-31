import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../app/model/appStore"
import AddContactIcon from '../../../assets/img/add-contact.svg'
import { Chat } from '../../../entities/Chat'
import { Menu } from "../../../entities/Menu"
import { Topbar } from "../../../entities/Topbar"
import { Button, InputField } from "../../../shared"
import { deleteAuthDataFromLocalStorage } from "../../lib/deleteAuthDataFromLocalStorage"
import { logout } from "../../model/auth/authSlice"
import { selectAuthData } from "../../model/auth/selectors"
import { setSelectedItem } from "../../model/chats/chatsSlice"
import { selectChats, selectCurrentItemId, selectItemsInfo } from "../../model/chats/selectors"
import { addNewContact } from "../../model/chats/thunks/addNewContact"
import { fetchChats } from "../../model/chats/thunks/fetchChats"
import styles from './Sidebar.module.scss'


export const Sidebar = () => {
    const [newContact, setNewContact] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('');
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

    useEffect(() => {
        if (selectedMenuItem === 'Выйти'){
            deleteAuthDataFromLocalStorage();
            dispatch(logout());
            setSelectedMenuItem('')
        }

    }, [selectedMenuItem])

    return (
        <div className={styles.sidebar}>
            <Topbar>
                <InputField 
                    placeholder={'Добавьте контакт'} 
                    text={newContact} setText={setNewContact} 
                    setIsSent={setIsAdded} 
                />
                <Button 
                    setIsClicked={setIsAdded} 
                    isFilledField={!!newContact}
                    iconUrl={AddContactIcon}
                    alt="add contact"
                />
                <Menu setSelectedMenuItem={setSelectedMenuItem} />
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

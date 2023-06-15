import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../app/model/appStore"
import { Chat } from '../../../entities/Chat'
import { Menu } from "../../../entities/Menu"
import { Topbar } from "../../../entities/Topbar"
import { Button, InputField } from "../../../shared"
import AddContactIcon from '../../../shared/assets/img/add-contact.svg'
import { Status } from "../../../shared/types"
import { Tooltip } from "../../../shared/ui/Tooltip/Tooltip"
import { deleteAuthDataFromLocalStorage } from "../../lib/deleteAuthDataFromLocalStorage"
import { logout } from "../../model/auth/authSlice"
import { selectAuthData } from "../../model/auth/selectors"
import { setAddingContactError, setSelectedItem } from "../../model/chats/chatsSlice"
import { selectAddingСontact, selectChats, selectCurrentItemId, selectItemsInfo } from "../../model/chats/selectors"
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
    const addingContact = useSelector(selectAddingСontact);

    useEffect(() => {
        if (!isMounted.current) {
            dispatch(fetchChats(authData));
        }
        isMounted.current = true
    }, [])

    useEffect(() => {
        if (isAdded) {
            if (+newContact.slice(1) && (newContact.length === 11 || newContact.length === 12)) {
                dispatch(addNewContact({ contact: newContact, authData }));
                setNewContact('');
            } else {
                dispatch(setAddingContactError({
                    status: Status.ERROR,
                    error: 'Неверный формат. Введите контакт в формате: +79118765535 или 89118765535'
                }));
            }
        }
        setIsAdded(false);
    }, [isAdded])

    useEffect(() => {
        if (addingContact.status === Status.ERROR) {
            dispatch(setAddingContactError({
                status: Status.LOADING,
                error: undefined
            }));
        }
    }, [newContact, selectedChatId])

    useEffect(() => {
        chatsTop.current?.scrollTo(0, 0)
    }, [chats])

    useEffect(() => {
        if (selectedMenuItem === 'Выйти') {
            deleteAuthDataFromLocalStorage();
            dispatch(logout());
            setSelectedMenuItem('')
        }

    }, [selectedMenuItem])

    return (
        <div className={styles.sidebar}>
            <Topbar>
                <Tooltip data={addingContact}>
                    <InputField
                        placeholder={'Добавьте контакт'}
                        text={newContact}
                        setText={setNewContact}
                        setIsSent={setIsAdded}
                    />
                </Tooltip>
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

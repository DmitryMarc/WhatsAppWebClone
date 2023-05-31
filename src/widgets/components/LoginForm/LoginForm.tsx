import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/model/appStore";
import { InputField, Preloader } from "../../../shared";
import { getCartFromLocalStorage } from "../../lib/getAuthDataFromLocalStorage";
import { selectAuthStatus } from "../../model/auth/selectors";
import { fetchStateInstance } from "../../model/auth/thunks/fetchStateInstance";
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const authStatus = useSelector(selectAuthStatus)
    const dispatch = useAppDispatch();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(fetchStateInstance({idInstance, apiTokenInstance}));
    }

    useEffect(() => {
        const authData = getCartFromLocalStorage();
        dispatch(fetchStateInstance(authData));
    }, [])

    if (authStatus === 'loading'){
        return <Preloader />
    }
    
    return (
        <form className={styles.content} onSubmit={submitHandler}>
            <label className={styles.wrapper}>
                <span>IdInstance:</span>
                <InputField 
                    placeholder={'Введите IdInstance'} 
                    text={idInstance} 
                    setText={setIdInstance} 
                />
            </label>
            <label className={styles.wrapper}>
                <span>ApiTokenInstance:</span>
                <InputField 
                    placeholder={'Введите ApiTokenInstance'} 
                    text={apiTokenInstance} 
                    setText={setApiTokenInstance} 
                />
            </label>
            <button 
                className={styles.loginBtn}
                disabled={!idInstance || !apiTokenInstance}
            >
                Войти
            </button>
        </form>
    )
}

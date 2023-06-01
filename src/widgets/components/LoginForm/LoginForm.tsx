import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/model/appStore";
import { InputField, Preloader } from "../../../shared";
import { getCartFromLocalStorage } from "../../lib/getAuthDataFromLocalStorage";
import { Status, setAuthError, setAuthStatus } from "../../model/auth/authSlice";
import { selectAuthError, selectAuthStatus } from "../../model/auth/selectors";
import { fetchStateInstance } from "../../model/auth/thunks/fetchStateInstance";
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const authStatus = useSelector(selectAuthStatus);
    const authError = useSelector(selectAuthError);
    const dispatch = useAppDispatch();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const authData = {
            idInstance: idInstance.trim(),
            apiTokenInstance: apiTokenInstance.trim()
        }
        if (+authData.idInstance && authData.idInstance.length === 10) {
            dispatch(fetchStateInstance(authData));
        } else {
            dispatch(setAuthError('*Входные данные некорректны'));
        }
    }

    useEffect(() => {
        const authData = getCartFromLocalStorage();
        if (authData) {
            dispatch(fetchStateInstance(authData));
        } else {
            dispatch(setAuthStatus(Status.SUCCESS));
        }
    }, [])

    if (authStatus === 'loading') {
        return <Preloader />
    }

    return (
        <form className={styles.content} onSubmit={submitHandler}>
            <div className={styles.loginForm}>
                <legend className={styles.title}>Аутентификация</legend>
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
                <div className={styles.loginBottom}>
                    {authStatus && 
                        <span
                            className={styles.error}
                        > 
                            {authError}
                        </span>
                    }
                    <button
                        className={styles.loginBtn}
                        disabled={!idInstance || !apiTokenInstance}
                    >
                        Войти
                    </button>
                </div>
            </div>
        </form>
    )
}

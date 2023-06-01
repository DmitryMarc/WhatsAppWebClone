import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchStateInstance } from "./thunks/fetchStateInstance";

export type AuthDataType = {
    idInstance: string,
    apiTokenInstance: string
}

type AuthStateType = {
    authData: AuthDataType,
    isAuthorized: boolean,
    status: Status,
    error: string | undefined
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export const initialState: AuthStateType = {
    authData: {
        idInstance: '',
        apiTokenInstance: ''
    },
    isAuthorized: false,
    status: Status.LOADING,
    error: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state){
            state.authData = {
                idInstance: '',
                apiTokenInstance: ''
            }
            state.isAuthorized = false;
            state.status = Status.LOADING;
            state.error = undefined;
        },
        setAuthStatus(state, action: PayloadAction<Status>){
            state.status = action.payload;
        },
        setAuthError(state, action: PayloadAction<string>){
            state.error = action.payload;
            state.status = Status.ERROR;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStateInstance.pending, (state) => {
            state.status = Status.LOADING;
            console.log('Идёт отправка');
        });
        builder.addCase(fetchStateInstance.fulfilled, (state, action) => {
            const {isAuthorised, stateInstance, idInstance, apiTokenInstance} = action.payload;
            if (isAuthorised){
                state.authData = {
                    idInstance: idInstance,
                    apiTokenInstance: apiTokenInstance
                };
                state.isAuthorized = isAuthorised;
            } else {
                switch(stateInstance){
                    case "notAuthorized": {
                        state.error = '*Аккаунт не авторизован';
                        break; 
                    };
                    case "starting": {
                        state.error = '*Аккаунт в процессе запуска (сервисный режим)';
                        break;
                    };
                    case "sleepMode": {
                        state.error = '*Аккаунт ушел в спящий режим';
                        break;
                    };
                    case "blocked": {
                        state.error = '*Аккаунт забанен';
                        break;
                    };
                }
            }
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchStateInstance.rejected, (state, action) => {
            state.status = Status.ERROR;
            const errorCode = action.payload;
            switch(errorCode){
                case 500: {
                    state.error = '*Серверная ошибка.';
                    break;
                };
                case 466: {
                    state.error = '*Исчерпан лимит запросов';
                    break;
                };
                case 401:
                case 400: {
                    state.error = '*Пользователь не авторизован';
                    break;
                };
            }
        });
    }
})

export const { logout, setAuthStatus, setAuthError } = authSlice.actions

export default authSlice.reducer
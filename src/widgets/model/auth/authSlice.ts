import { createSlice } from "@reduxjs/toolkit";
import { fetchStateInstance } from "./thunks/fetchStateInstance";

export type AuthDataType = {
    idInstance: string,
    apiTokenInstance: string
}

type AuthStateType = {
    authData: AuthDataType,
    isAuthorized: boolean,
    status: Status
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
    status: Status.LOADING
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
            state.isAuthorized = false,
            state.status = Status.LOADING
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStateInstance.pending, (state) => {
            state.status = Status.LOADING;
            console.log('Идёт отправка');
        });
        builder.addCase(fetchStateInstance.fulfilled, (state, action) => {
            if (action.payload){
                state.authData = {
                    idInstance: action.payload.idInstance,
                    apiTokenInstance: action.payload.apiTokenInstance
                };
                state.isAuthorized = action.payload.isAuthorised;
            }
            state.status = Status.SUCCESS;
            console.log('Прошёл процесс аутентификации');
        });
        builder.addCase(fetchStateInstance.rejected, (state) => {
            state.status = Status.ERROR;
            console.log('Была ошибка');
        });
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
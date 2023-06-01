import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../../api/authApi";
import { AxiosError } from "axios";

export const fetchStateInstance = createAsyncThunk(
    'auth/fetchStateInstance',
    async ({idInstance, apiTokenInstance}: {idInstance: string, apiTokenInstance: string}, {rejectWithValue}) => {
        try {
            // idInstance = idInstance.trim();
            // apiTokenInstance = apiTokenInstance.trim();
            const response = await authAPI.getStateInstance(idInstance, apiTokenInstance);
            if (!response){
                throw new Error('some error');
            }
            
            let isAuthorised = false;
            const stateInstance = response.stateInstance;
            if(stateInstance === 'authorized'){
                const json = JSON.stringify({idInstance, apiTokenInstance});
                localStorage.setItem('auth', json);
                isAuthorised = true;
            } 
            return {isAuthorised, stateInstance, idInstance, apiTokenInstance};
        } catch (error) {
            if (error instanceof AxiosError){
                const errorCode = error.response?.status;
                return rejectWithValue(errorCode);
            }
            throw error;
        }
    }
)
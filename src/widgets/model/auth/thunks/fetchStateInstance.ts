import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../../api/authApi";

export const fetchStateInstance = createAsyncThunk(
    'auth/fetchStateInstance',
    async ({idInstance, apiTokenInstance}: {idInstance: string, apiTokenInstance: string}) => {
        const response = await authAPI.getStateInstance(idInstance, apiTokenInstance);

        if(response.stateInstance === 'authorized'){
            const json = JSON.stringify({idInstance, apiTokenInstance});
            localStorage.setItem('auth', json);
            return {isAuthorised: true, idInstance, apiTokenInstance};
        } 
        return false;
    }
)
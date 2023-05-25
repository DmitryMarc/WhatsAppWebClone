import { instanceApi } from './consts/intanceApi';

type StateInstanceType = {
    stateInstance: 'notAuthorized' | 'authorized' | 'blocked' | 'sleepMode' | 'starting'
}

export const authAPI = {
    async getStateInstance(idInstance: string, apiTokenInstance: string) {
        return instanceApi.get<StateInstanceType>(`waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
            .then(response => response.data);
    }
}
import { RootState } from "../../../app/model/appStore";

export const selectAuthData = (state: RootState) => state.auth.authData;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
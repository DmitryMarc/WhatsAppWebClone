import { RootState } from "../../../app/model/appStore";

export const selectIsAuth = (state: RootState) => state.auth.isAuthorized;
export const selectAuthData = (state: RootState) => state.auth.authData;
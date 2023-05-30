import { RootState } from "../../../app/model/appStore";

export const selectAuthData = (state: RootState) => state.auth.authData;
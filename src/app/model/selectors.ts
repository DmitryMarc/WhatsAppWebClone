import { RootState } from "./appStore";

export const selectIsAuth = (state: RootState) => state.auth.isAuthorized;
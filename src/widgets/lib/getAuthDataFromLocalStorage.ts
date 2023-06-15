import { AuthDataType } from "../../shared/types";

export const getCartFromLocalStorage = (): AuthDataType | null => {
    const data = localStorage.getItem('auth');
    return data ? JSON.parse(data) : null;
}
import { RootState } from "../../../app/model/appStore";

export const selectChats = (state: RootState) => state.chats.items;
export const selectItemsInfo = (state: RootState) => state.chats.itemsInfo;
export const selectCurrentItemId = (state: RootState) => state.chats.selectedItemId;
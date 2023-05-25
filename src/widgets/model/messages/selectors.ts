import { RootState } from "../../../app/model/appStore";

export const selectChatHistory = (state: RootState) => state.messages.chatHistory;
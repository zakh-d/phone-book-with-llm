import { createSlice } from "@reduxjs/toolkit";

interface Message {
    isUser: boolean;
    message: string;
}

interface ChatState {
    messages: Message[];
}

const initialState: ChatState = {
    messages: [
    ],
};

const chatSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        addMessage: (state: ChatState, action) => {
        state.messages.push(action.payload);
        },
    },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
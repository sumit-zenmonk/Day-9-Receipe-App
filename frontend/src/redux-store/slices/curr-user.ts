import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface currentUserSchemaType {
    user_id: number | null;
    username: string;
    email: string;
    access_token: string;
}
const initialState: currentUserSchemaType = {
    user_id: null,
    username: '',
    email: '',
    access_token: ''
}

export const currentUserSlice = createSlice({
    name: 'curr_user',
    initialState,
    reducers: {
        currentUser: (state: currentUserSchemaType, action: PayloadAction<currentUserSchemaType>) => {
            state.user_id = action.payload.user_id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.access_token = action.payload.access_token;
        }
    }
})

export const { currentUser } = currentUserSlice.actions

export default currentUserSlice.reducer
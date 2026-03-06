import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecipeType {
    recipe_uuid: string;
    recipe_name: string;
    images: { uuid: string; img: string }[];
    steps: { uuid: string; steps_string: string }[];
    favoritedBy: { user_uuid: string; is_active: boolean }[];
    description: string;
}

const initialState: RecipeType[] = [];

export const currentUserSlice = createSlice({
    name: 'global_data',
    initialState,
    reducers: {
        setglobalDataAction: (state, action: PayloadAction<RecipeType[]>) => {
            state = action.payload;
            return action.payload;
        },
    }
})

export const { setglobalDataAction } = currentUserSlice.actions;
export default currentUserSlice.reducer;

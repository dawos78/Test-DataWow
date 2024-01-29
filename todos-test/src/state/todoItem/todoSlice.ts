import { createSlice } from "@reduxjs/toolkit";

interface itemsState {
    items: Array<{id:string, title: string, completed: boolean }>;
}

const initialState: itemsState = {
    items: []
};

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        initItems: (state, action) => {
            state.items = action.payload;
        },
        addItem: (state, action) => {
            state.items = [...state.items, action.payload];
        },
    },
});

export const { initItems, addItem } = itemsSlice.actions;
export default itemsSlice.reducer;
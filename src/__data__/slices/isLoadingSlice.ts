import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: boolean = false

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState,
    reducers: {
        changeLoading: (state: boolean, action: PayloadAction<boolean>) => {
            state = action.payload
        },
    },
})

export const { changeLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;

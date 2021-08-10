import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: boolean = false

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState,
    reducers: {
        changeLoadingState: (state: boolean, action: PayloadAction<boolean>) => {
            return action.payload
        },
    },
})

export const { changeLoadingState } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;

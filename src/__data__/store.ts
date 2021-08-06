import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from "./slices/isLoadingSlice";
import alphabetSlice from "./slices/alphabetSlice";
import paintSlice from "./slices/paintSlice";

export const store = configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        alphabet: alphabetSlice,
        paint: paintSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

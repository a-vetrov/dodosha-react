import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "../store";
import { changeLoadingState } from "./isLoadingSlice";


interface IPaintItem {
    svg: string
}

export interface IPaintCategory {
    title: string
    url: string
    items: IPaintItem[]
}

interface IPaintData {
    categories: IPaintCategory[]
}

interface PaintState extends IPaintData {
    loaded:boolean
}

const initialState: PaintState = {
    loaded: false,
    categories: [],
}

export const paintSlice = createSlice({
    name: 'paint',
    initialState,
    reducers: {
        loadingCompleteSuccess: (state: PaintState, action: PayloadAction<IPaintData>) => {
            state.loaded = true
            state.categories = action.payload.categories
        },
        loadingCompleteError: (state: PaintState) => {
            state.loaded = false
        },
    },
})

const { loadingCompleteSuccess, loadingCompleteError } = paintSlice.actions;

const URL = process.env.PUBLIC_URL + '/paint/paint.json'

export const fetchPaintData = () => (dispatch: AppDispatch) => {

    dispatch(changeLoadingState(true))

    fetch(URL)
        .then((response) => {
            dispatch(changeLoadingState(false))

            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(loadingCompleteSuccess(data)))
        .catch(() => dispatch(loadingCompleteError()))
};

export default paintSlice.reducer;

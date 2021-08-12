import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchData} from "../actions/fetchData";


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
    loaded:boolean,
    color: {
        main: string,
        current: string,
    }
}

const initialState: PaintState = {
    loaded: false,
    categories: [],
    color: {
        main: '#ff0000',
        current: '#ff0000',
    }
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
        setMainColor: (state: PaintState, color: PayloadAction<string>) => {
            state.color.main = state.color.current = color.payload
        },
        setCurrentColor: (state: PaintState, color: PayloadAction<string>) => {
            state.color.current = color.payload
        },
    },
})

const { loadingCompleteSuccess, loadingCompleteError, setMainColor, setCurrentColor } = paintSlice.actions;

export {setMainColor, setCurrentColor}

const URL = process.env.PUBLIC_URL + '/paint/paint.json'

export const fetchPaintData = () =>  fetchData(URL, loadingCompleteSuccess, loadingCompleteError)

export const getCategoryByUrl = (state: PaintState, url: string) => state.categories.find(item => item.url === url)

export const getMainColor = (state: PaintState) => state.color.main

export const getCurrentColor = (state: PaintState) => state.color.current

export default paintSlice.reducer;

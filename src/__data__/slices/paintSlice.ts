import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchData} from "../actions/fetchData";


interface IPaintItem {
    svg: string,
    title: string
}

export interface IPaintCategory {
    title: string
    url: string
    preview?: string
    items: IPaintItem[]
}

interface IPaintData {
    title?: string
    categories: IPaintCategory[]
}

export type IPaintInstrument = 'eraser' | 'brush'


interface PaintState extends IPaintData {
    loaded:boolean,
    color: {
        main: string,
        current: string,
    },
    currentInstrument: IPaintInstrument
}

const initialState: PaintState = {
    loaded: false,
    categories: [],
    color: {
        main: '#ff0000',
        current: '#ff0000',
    },
    currentInstrument: "brush"
}

export const paintSlice = createSlice({
    name: 'paint',
    initialState,
    reducers: {
        loadingCompleteSuccess: (state: PaintState, action: PayloadAction<IPaintData>) => {
            state.loaded = true
            state.categories = action.payload.categories
            state.title = action.payload.title
        },
        loadingCompleteError: (state: PaintState) => {
            state.loaded = false
        },
        setMainColor: (state: PaintState, color: PayloadAction<string>) => {
            state.color.main = state.color.current = color.payload
            state.currentInstrument = 'brush'
        },
        setCurrentColor: (state: PaintState, color: PayloadAction<string>) => {
            state.color.current = color.payload
            state.currentInstrument = 'brush'
        },
        setCurrentInstrument: (state: PaintState, instrument: PayloadAction<IPaintInstrument>) => {
            state.currentInstrument = instrument.payload
        },
    },
})

const { loadingCompleteSuccess, loadingCompleteError, setMainColor, setCurrentColor, setCurrentInstrument } = paintSlice.actions;

export {setMainColor, setCurrentColor, setCurrentInstrument}

const URL = process.env.PUBLIC_URL + '/paint/paint.json'

export const fetchPaintData = () =>  fetchData(URL, loadingCompleteSuccess, loadingCompleteError)

export const getCategoryByUrl = (state: PaintState, url: string) => state.categories.find(item => item.url === url)

export const getMainColor = (state: PaintState) => state.color.main

export const getCurrentColor = (state: PaintState) => state.color.current

export const getCurrentInstrument = (state: PaintState) => state.currentInstrument

export default paintSlice.reducer;

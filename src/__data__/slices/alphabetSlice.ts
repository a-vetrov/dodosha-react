import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {fetchData} from "../actions/fetchData";

export interface IWord {
    word: string
    img: string
    mp3: string
    letter: string
}

interface ILetter {
    value: string
    mp3: string
}

interface IAlphabetData {
    letterWord: string
    letters: ILetter[]
    words: IWord[]
}

interface AlphabetState extends IAlphabetData {
    loaded:boolean
}

const initialState: AlphabetState = {
    loaded: false,
    letters: [],
    words: [],
    letterWord: '',
}

export const alphabetSlice = createSlice({
    name: 'alphabet',
    initialState,
    reducers: {
        loadingCompleteSuccess: (state: AlphabetState, action: PayloadAction<IAlphabetData>) => {
            state.loaded = true
            const {letterWord, letters, words} = action.payload
            state.letterWord = letterWord
            state.letters = letters
            state.words = words
        },
        loadingCompleteError: (state: AlphabetState) => {
            state.loaded = false
        },
    },
})

const { loadingCompleteSuccess, loadingCompleteError } = alphabetSlice.actions;

const URL = process.env.PUBLIC_URL + '/alphabet/alphabet.json'

export const fetchAlphabetData = () =>  fetchData(URL, loadingCompleteSuccess, loadingCompleteError)

export default alphabetSlice.reducer;

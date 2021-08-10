import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {fetchData} from "../actions/fetchData";

export interface IWord {
    word: string
    img: string
    mp3: string
    letter: string
}

export interface ILetter {
    value: string
    mp3: string
}

export interface IURLDictionary {
    [key: string]: string
}

interface IAlphabetData {
    letterWord: string
    letters: ILetter[]
    words: IWord[]
}

interface AlphabetState extends IAlphabetData {
    loaded:boolean,
    error: boolean
}

const initialState: AlphabetState = {
    loaded: false,
    letters: [],
    words: [],
    letterWord: '',
    error: false,
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
            state.error = true
        },
    },
})

const { loadingCompleteSuccess, loadingCompleteError } = alphabetSlice.actions;

const URL = process.env.PUBLIC_URL + '/alphabet/alphabet.json'

export const fetchAlphabetData = () =>  fetchData(URL, loadingCompleteSuccess, loadingCompleteError)

export const getLetters = (state: AlphabetState): string[] => state.letters.map(item => item.value)

export const getLettersURLDict = (state: AlphabetState): IURLDictionary => state.letters.reduce((accumulator: IURLDictionary, item) => {
    accumulator[item.value] = item.mp3
    return accumulator
}, {})

const SHORT_WORD_LENGTH = 6

export const getShortWords = (state: AlphabetState) => state.words.filter(item => item.word.length <= SHORT_WORD_LENGTH)

export default alphabetSlice.reducer;

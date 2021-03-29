import { createSelector } from 'reselect'

export const getLetters = createSelector(
    state => state.alphabet.letters,
    (arr) => arr.map(item => item.value)
)

export const getLettersURLDict = createSelector(
    state => state.alphabet.letters,
    (arr) => arr.reduce((accumulator, item) => {
        accumulator[item.value] = item.mp3
        return accumulator
    }, {})
)

import { createSelector } from 'reselect'

const SHORT_WORD_LENGTH = 6

export const getShortWords = createSelector(
    state => state.alphabet.words,
    (arr) => arr.filter(item => item.word.length <= SHORT_WORD_LENGTH)
)
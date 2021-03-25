import { createSelector } from 'reselect'

export const getLetters = createSelector(
    state => state.alphabet?.letters,
    (arr) => arr.map(item => item.value)
)

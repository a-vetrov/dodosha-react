
export const getWordsByLetter = (words, letter) => words.filter(item => item.letter === letter)

const ALPHABET_BASE_URL = '/alphabet/'

export const getAlphabetURL = url => process.env.PUBLIC_URL + ALPHABET_BASE_URL + url
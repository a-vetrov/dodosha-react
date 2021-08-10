import {IWord} from "../../__data__/slices/alphabetSlice";

export const getWordsByLetter = (words: IWord[], letter: string) => words.filter(item => item.letter === letter)

const ALPHABET_BASE_URL = '/alphabet/'

export const getAlphabetURL = (url: string) => process.env.PUBLIC_URL + ALPHABET_BASE_URL + url

export const getSoundURLs = ({mp3, letter, letterWord}: {mp3?: string, letter: string, letterWord: string}) => {
    const arr = [
        getAlphabetURL(letterWord),
        getAlphabetURL(letter),
    ]

    if (mp3) {
        arr.push(getAlphabetURL(mp3))
    }

    return arr
}

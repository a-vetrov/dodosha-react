import React, {useEffect, useState} from 'react';
import _ from 'lodash'

import BackButton from "../../components/back-button/BackButton";
import Keyboard from "./Keyboard";
import LetterBlock from "./LetterBlock";
import {getSoundURLs, getWordsByLetter} from "./utils";
import WordBlock from "./WordBlock";
import {playSoundSequence} from "../../utils/soundUtils";
import ErrorMessage from "../../components/error-message/ErrorMessage";

import style from './SpeakingKeyboard.module.css'
import {useAppDispatch, useAppSelector} from "../../__data__/hooks";
import {fetchAlphabetData, getLettersURLDict, IWord} from "../../__data__/slices/alphabetSlice";

const SpeakingKeyboard = () => {

    const dispatch = useAppDispatch()
    const loaded = useAppSelector((state) => state.alphabet.loaded)
    const error = useAppSelector((state) => state.alphabet.error)
    const words = useAppSelector((state) => state.alphabet.words)
    const letters = useAppSelector((state) => getLettersURLDict(state.alphabet))
    const letterWord = useAppSelector((state) => state.alphabet.letterWord)

    const [currentLetter, setCurrentLetter] = useState<string | undefined>(undefined)
    const [currentWord, setCurrentWord] = useState<IWord | undefined>(undefined)

    useEffect(() => {
        if (!loaded){ // @ts-ignore
                dispatch(fetchAlphabetData())
        }
    // eslint-disable-next-line
    }, [])

    const onLetterChange = (s: string) => {
        setCurrentLetter(s)
        const word: IWord | undefined = _.sample(getWordsByLetter(words, s))
        if (word) {
            playSoundSequence(getSoundURLs({mp3: word.mp3, letterWord, letter: letters[word.letter]}))
        } else {
            playSoundSequence(getSoundURLs({letterWord, letter: letters[s]}))
        }
        setCurrentWord(word)
    }

    if (error){
        return <ErrorMessage message='Ошибка загрузки'/>
    }

    if (!loaded)
        return null

    return (
        <>
            <BackButton />
            <div className={style['main-container']}>
                <LetterBlock letter={currentLetter}/>
                <Keyboard onChange={onLetterChange}/>
                <WordBlock {...currentWord} />
            </div>
        </>
    );
};

export default SpeakingKeyboard

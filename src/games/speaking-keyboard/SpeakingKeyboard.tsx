import React, {useCallback, useEffect, useState} from 'react';
import _ from 'lodash'

import Keyboard from "./Keyboard";
import LetterBlock from "./LetterBlock";
import {getSoundURLs, getWordsByLetter} from "./utils";
import WordBlock from "./WordBlock";
import {playSoundSequence} from "../../utils/soundUtils";
import ErrorMessage from "../../components/error-message/ErrorMessage";

import style from './SpeakingKeyboard.module.css'
import {useAppDispatch, useAppSelector} from "../../__data__/hooks";
import {fetchAlphabetData, getLettersURLDict, IWord} from "../../__data__/slices/alphabetSlice";
import useTitle from "../../utils/hooks/useTitle";
import {NAVIGATION_URL, TITLE} from "../../__data__/constants";
import PageTemplate from "../../components/page-template/PageTemplate";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import {useHistory} from "react-router-dom";
import GameWindow from "../../components/window";

const breadCrumbs = [
    {
        caption: 'Изучаем алфавит',
        link: NAVIGATION_URL.ALPHABET
    },
    {
        caption: TITLE.ALPHABET_SPEAKING_KEYBOARD
    }
]

const SpeakingKeyboard: React.FC = () => {

    const dispatch = useAppDispatch()
    const loaded = useAppSelector((state) => state.alphabet.loaded)
    const error = useAppSelector((state) => state.alphabet.error)
    const words = useAppSelector((state) => state.alphabet.words)
    const letters = useAppSelector((state) => getLettersURLDict(state.alphabet))
    const letterWord = useAppSelector((state) => state.alphabet.letterWord)

    const [currentLetter, setCurrentLetter] = useState<string | undefined>(undefined)
    const [currentWord, setCurrentWord] = useState<IWord | undefined>(undefined)

    useTitle(TITLE.ALPHABET_SPEAKING_KEYBOARD)

    const history = useHistory()

    const handleClose = useCallback(() => {
        history.push(NAVIGATION_URL.ALPHABET)
    }, [history])

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
        <PageTemplate animateClouds={false}>
            <div className={style.breadcrumbsContainer}>
                <Breadcrumb items={breadCrumbs}/>
            </div>
            <GameWindow onClose={handleClose}>
                <div className={style.absoluteContainer}>
                    <div className={style.mainContainer}>
                        <LetterBlock letter={currentLetter}/>
                        <Keyboard onChange={onLetterChange}/>
                        <WordBlock {...currentWord} />
                    </div>
                </div>
            </GameWindow>
        </PageTemplate>
    );
};

export default SpeakingKeyboard

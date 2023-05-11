import React, {useEffect, useState, useLayoutEffect, useCallback} from 'react';
import _ from 'lodash'

import ErrorMessage from "../../components/error-message/ErrorMessage";
import Puzzle from "./Puzzle";
import {useAppDispatch, useAppSelector} from "../../__data__/hooks";
import {fetchAlphabetData, getShortWords, IWord} from "../../__data__/slices/alphabetSlice";
import useTitle from "../../utils/hooks/useTitle";
import {NAVIGATION_URL, TITLE} from "../../__data__/constants";
import PageTemplate from "../../components/page-template/PageTemplate";

import style from './AlphabetPuzzle.module.css'
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import GameWindow from "../../components/window";
import {useHistory} from "react-router-dom";

const breadCrumbs = [
    {
        caption: 'Изучаем алфавит',
        link: NAVIGATION_URL.ALPHABET
    },
    {
        caption: TITLE.ALPHABET_ALPHABET_PUZZLE
    }
]

const AlphabetPuzzle = () => {

    const dispatch = useAppDispatch()
    const history = useHistory()
    const loaded = useAppSelector((state) => state.alphabet.loaded)
    const error = useAppSelector((state) => state.alphabet.error)
    const words = useAppSelector((state) => getShortWords(state.alphabet))

    const [currentWord, setCurrentWord] = useState<IWord | undefined>()

    const setRandomCurrentWord = () => {
        setCurrentWord(_.sample(words))
    }

    const handleClose = useCallback(() => {
        history.push(NAVIGATION_URL.ALPHABET)
    }, [history])


    useTitle(TITLE.ALPHABET_ALPHABET_PUZZLE)

    useEffect(() => {
        if (!loaded){ // @ts-ignore
            dispatch(fetchAlphabetData())
        }
        // eslint-disable-next-line
    }, [])

    useLayoutEffect(() => {
        if (loaded)
            setRandomCurrentWord()
        // eslint-disable-next-line
    }, [loaded])

    if (error){
        return <ErrorMessage message='Ошибка загрузки'/>
    }

    if (!loaded)
        return null

    const handleComplete = () => {
        setRandomCurrentWord()
    }


    return (
        <PageTemplate animateClouds={false}>
            <div className={style.breadcrumbsContainer}>
                <Breadcrumb items={breadCrumbs}/>
            </div>
            <GameWindow onClose={handleClose}>
                {currentWord && <Puzzle {...currentWord} onComplete={handleComplete}/>}
            </GameWindow>
        </PageTemplate>
    )
}

export default AlphabetPuzzle

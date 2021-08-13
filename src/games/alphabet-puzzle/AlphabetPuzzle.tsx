import React, {useEffect, useState, useLayoutEffect} from 'react';
import _ from 'lodash'

import BackButton from "../../components/back-button/BackButton";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import Puzzle from "./Puzzle";
import {useAppDispatch, useAppSelector} from "../../__data__/hooks";
import {fetchAlphabetData, getShortWords, IWord} from "../../__data__/slices/alphabetSlice";
import useTitle from "../../utils/hooks/useTitle";
import {TITLE} from "../../__data__/constants";

const AlphabetPuzzle = () => {

    const dispatch = useAppDispatch()
    const loaded = useAppSelector((state) => state.alphabet.loaded)
    const error = useAppSelector((state) => state.alphabet.error)
    const words = useAppSelector((state) => getShortWords(state.alphabet))

    const [currentWord, setCurrentWord] = useState<IWord | undefined>()

    const setRandomCurrentWord = () => {
        setCurrentWord(_.sample(words))
    }

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
        <>
            <BackButton />
            {currentWord && <Puzzle {...currentWord} onComplete={handleComplete}/>}
        </>
    )
}

export default AlphabetPuzzle

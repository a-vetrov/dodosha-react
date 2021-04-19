import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import PropTypes from 'prop-types';

import BackButton from "../../components/back-button/BackButton";
import {fetchAlphabetData} from "../../__data__/actions/fetchAlphabetData";
import Keyboard from "./Keyboard";
import LetterBlock from "./LetterBlock";
import {getSoundURLs, getWordsByLetter} from "./utils";
import WordBlock from "./WordBlock";
import {playSoundSequence} from "../../utils/soundUtils";
import {getLettersURLDict} from "../../__data__/selectors/alphabet/getLetters";
import ErrorMessage from "../../components/error-message/ErrorMessage";

import style from './SpeakingKeyboard.module.css'

const SpeakingKeyboard = ({fetch, loaded, words, letters, letterWord, error}) => {

    const [currentLetter, setCurrentLetter] = useState(null)
    const [currentWord, setCurrentWord] = useState(null)

    useEffect(() => {
        if (!loaded)
            fetch()
    // eslint-disable-next-line
    }, [])

    const onLetterChange = s => {
        setCurrentLetter(s)
        const word = _.sample(getWordsByLetter(words, s))
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
                <div className={style['left-container']}>
                    <LetterBlock letter={currentLetter}/>
                    <Keyboard onChange={onLetterChange}/>
                </div>
                <div className={style['right-container']}>
                    {currentWord && <WordBlock {...currentWord} />}
                </div>
            </div>
        </>
    );
};

SpeakingKeyboard.propTypes = {
    fetch: PropTypes.func.isRequired,
    loaded: PropTypes.bool,
    words: PropTypes.arrayOf(PropTypes.object),
    letters: PropTypes.object,
    letterWord: PropTypes.string,
    error: PropTypes.bool,
}

SpeakingKeyboard.defaultProps = {
    loaded: false,
    words: [],
    letters: {},
    letterWord: '',
    error: false,
}

const mapDispatchToProps = (dispatch) => ({
    fetch: bindActionCreators(fetchAlphabetData, dispatch)
})

const mapStateToProps = (state) => ({
    loaded: state.alphabet.loaded,
    words: state.alphabet.words,
    letters: getLettersURLDict(state),
    letterWord: state.alphabet.letterWord,
    error: state.alphabet.error,
})

export default connect(mapStateToProps, mapDispatchToProps)(SpeakingKeyboard)

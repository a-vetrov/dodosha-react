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

const SpeakingKeyboard = ({fetch, loaded, words, letters, letterWord}) => {

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

    if (!loaded)
        return null

    return (
        <>
            <BackButton />
            <div>
                {currentWord && <WordBlock {...currentWord} />}
                {currentLetter && <LetterBlock letter={currentLetter}/>}
                <Keyboard onChange={onLetterChange}/>
            </div>
        </>
    );
};

SpeakingKeyboard.propTypes = {
    fetch: PropTypes.func.isRequired,
    loaded: PropTypes.bool,
    words: PropTypes.arrayOf(PropTypes.object),
    letters: PropTypes.object,
}

SpeakingKeyboard.defaultProps = {
    loaded: false,
    words: [],
    letters: {},
}

const mapDispatchToProps = (dispatch) => ({
    fetch: bindActionCreators(fetchAlphabetData, dispatch)
})

const mapStateToProps = (state) => ({
    loaded: state.alphabet.loaded,
    words: state.alphabet.words,
    letters: getLettersURLDict(state),
    letterWord: state.alphabet.letterWord,
})

export default connect(mapStateToProps, mapDispatchToProps)(SpeakingKeyboard)

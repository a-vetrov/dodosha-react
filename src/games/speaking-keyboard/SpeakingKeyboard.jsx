import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import PropTypes from 'prop-types';

import BackButton from "../../components/back-button/BackButton";
import {fetchAlphabetData} from "../../__data__/actions/fetchAlphabetData";
import Keyboard from "./Keyboard";
import LetterBlock from "./LetterBlock";
import {getAlphabetURL, getSoundURLs, getWordsByLetter} from "./utils";
import WordBlock from "./WordBlock";
import {playSound, playSoundSequence} from "../../utils/soundUtils";

const SpeakingKeyboard = ({fetch, loaded, words, letterWord}) => {

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
        //playSound({url:getAlphabetURL(word.mp3), onEnd: () => console.log('The end')})
        if (word)
            playSoundSequence(getSoundURLs({...word, letterWord}))
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
}

SpeakingKeyboard.defaultProps = {
    loaded: false,
    words: [],
}

const mapDispatchToProps = (dispatch) => ({
    fetch: bindActionCreators(fetchAlphabetData, dispatch)
})

const mapStateToProps = (state) => ({
    loaded: state.alphabet.loaded,
    words: state.alphabet?.words,
    letterWord: state.alphabet?.letterWord,
})

export default connect(mapStateToProps, mapDispatchToProps)(SpeakingKeyboard)

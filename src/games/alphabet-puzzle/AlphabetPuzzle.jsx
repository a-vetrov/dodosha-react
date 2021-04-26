import React, {useEffect, useState, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'

import BackButton from "../../components/back-button/BackButton";
import {bindActionCreators} from "redux";
import {fetchAlphabetData} from "../../__data__/actions/fetchAlphabetData";
import {connect} from "react-redux";
import {getShortWords} from "../../__data__/selectors/alphabet/getWords";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import Puzzle from "./Puzzle";

const AlphabetPuzzle = ({fetch, loaded, words, error}) => {

    const [currentWord, setCurrentWord] = useState(null)

    const setRandomCurrentWord = () => {
        setCurrentWord(_.sample(words))
    }

    useEffect(() => {
        if (!loaded)
            fetch()
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
        console.log('Puzzle completed')
    }


    return (
        <>
            <BackButton />
            <div>
                AlphabetPuzzle {currentWord?.word}
                {currentWord && <Puzzle {...currentWord} onComplete={handleComplete}/>}
            </div>
        </>
    );
};

AlphabetPuzzle.propTypes = {
    fetch: PropTypes.func.isRequired,
    loaded: PropTypes.bool,
    words: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.bool,
}

AlphabetPuzzle.defaultProps = {
    loaded: false,
    words: [],
    error: false,
}

const mapDispatchToProps = (dispatch) => ({
    fetch: bindActionCreators(fetchAlphabetData, dispatch)
})

const mapStateToProps = (state) => ({
    loaded: state.alphabet.loaded,
    words: getShortWords(state),
    letterWord: state.alphabet.letterWord,
    error: state.alphabet.error,
})

export default connect(mapStateToProps, mapDispatchToProps)(AlphabetPuzzle);
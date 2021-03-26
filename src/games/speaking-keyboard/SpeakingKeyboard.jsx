import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BackButton from "../../components/back-button/BackButton";
import {fetchAlphabetData} from "../../__data__/actions/fetchAlphabetData";
import Keyboard from "./Keyboard";
import LetterBlock from "./LetterBlock";

const SpeakingKeyboard = ({fetch, loaded, data}) => {

    const [currentLetter, setCurrentLetter] = useState(null)

    useEffect(() => {
        if (!loaded)
            fetch()
    // eslint-disable-next-line
    }, [])

    const onLetterChange = s => {
        setCurrentLetter(s)
    }

    //console.log('data', data)

    if (!loaded)
        return null

    return (
        <>
            <BackButton />
            <div>
                <LetterBlock letter={currentLetter}/>
                <Keyboard onChange={onLetterChange}/>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetch: bindActionCreators(fetchAlphabetData, dispatch)
})

const mapStateToProps = (state) => ({
    loaded: state.alphabet.loaded,
    data: state.alphabet,
})

export default connect(mapStateToProps, mapDispatchToProps)(SpeakingKeyboard)

import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BackButton from "../../components/back-button/BackButton";
import {fetchAlphabetData} from "../../__data__/actions/fetchAlphabetData";
import Keyboard from "./Keyboard";

const SpeakingKeyboard = ({fetch, loaded, data}) => {

    useEffect(() => {
        fetch()
    // eslint-disable-next-line
    }, [])

    console.log('data', data)

    if (!loaded)
        return null

    return (
        <>
            <BackButton />
            <div>
                Говорящий алфавит
                <Keyboard />
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

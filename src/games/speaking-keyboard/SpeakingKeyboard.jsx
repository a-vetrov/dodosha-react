import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BackButton from "../../components/back-button/BackButton";
import {fetchAlphabetData} from "../../__data__/actions/fetchAlphabetData";

const SpeakingKeyboard = ({fetch, loaded, data}) => {

    useEffect(() => {
        fetch()
    // eslint-disable-next-line
    }, [])

    console.log('data', data)

    return (
        <>
            <BackButton />
            <div>
                Говорящий алфавит
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

import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import style from './WordBlock.module.css'
import {getAlphabetURL} from "./utils";
import {NO_GRAPHICS_MODE} from "../../__data__/constants";

const WordBlock = ({word, img,}) => {

    const imgStyle = useMemo(() => {
        const url = getAlphabetURL(img)
        return {
            backgroundImage: `url(${url})`
        }
    }, [img])

    if (!word) {
        return <div className={style['container-empty']} />
    }

    return (
        <div className={style.container}>
            <div className={style.imageContainer} style={NO_GRAPHICS_MODE ? null : imgStyle}>
                {NO_GRAPHICS_MODE ? img : ''}
            </div>
            <div className={style.word}>{word}</div>
        </div>
    );
};

WordBlock.propTypes = {
    word: PropTypes.string,
    img: PropTypes.string,
}

WordBlock.defaultProps = {
    word: null,
    img: null,
}


export default WordBlock;
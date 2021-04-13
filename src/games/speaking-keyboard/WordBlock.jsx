import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import style from './WordBlock.module.css'
import {getAlphabetURL} from "./utils";
import {NO_GRAPHICS_MODE} from "../../__data__/constants";

const WordBlock = ({word, img,}) => {
    const url = useMemo(() => getAlphabetURL(img), [img])

    const imgStyle = useMemo(() => {
        const url = getAlphabetURL(img)
        return {
            backgroundImage: `url(${url})`
        }
    }, [img])

    return (
        <div className={style.container}>
            <div className={style.imageContainer} style={NO_GRAPHICS_MODE ? null : imgStyle}>
                {NO_GRAPHICS_MODE ? url : ''}
            </div>
            <div className={style.word}>{word}</div>
        </div>
    );
};

WordBlock.propTypes = {
    word: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

export default WordBlock;
import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import style from './WordBlock.module.css'
import {getAlphabetURL} from "./utils";
import {NO_GRAPHICS_MODE} from "../../__data__/constants";

const WordBlock = ({word, img,}) => {
    const url = useMemo(() => getAlphabetURL(img), [img])

    return (
        <div className={style.container}>
            <div className={style.imageContainer}>
                {NO_GRAPHICS_MODE ? url : <img src={url} alt='' />}
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
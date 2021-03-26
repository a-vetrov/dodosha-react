import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import style from './WordBlock.module.css'
import {getAlphabetURL} from "./utils";

const WordBlock = ({word, img,}) => {
    const url = useMemo(() => getAlphabetURL(img), [img])

    return (
        <div className={style.container}>
            <div>
                <img src={url} alt='' />
            </div>
            <div>{word}</div>
        </div>
    );
};

WordBlock.propTypes = {
    word: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

export default WordBlock;
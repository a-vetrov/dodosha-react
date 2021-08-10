import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'

import style from './WordBlock.module.css'
import {getAlphabetURL} from "./utils";
import {NO_GRAPHICS_MODE} from "../../__data__/constants";
import useAppear from "./hooks/useAppear";

type WordBlockProps = {
    word: string,
    img: string,
}

const WordBlock = ({word, img,}: WordBlockProps) => {

    const {isAppear, onAnimationEnd, localParam:localWord} = useAppear(word)

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
        <div className={classnames(style.container, { [style.appear]: isAppear })} onAnimationEnd={onAnimationEnd}>
            <div className={style.imageContainer} style={NO_GRAPHICS_MODE ? undefined : imgStyle}>
                {NO_GRAPHICS_MODE ? img : ''}
            </div>
            <div className={style.word}>{localWord}</div>
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

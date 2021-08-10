import React from 'react';
import classnames from 'classnames'

import style from './LetterBlock.module.css'
import useAppear from "./hooks/useAppear";

type LetterBlockProps = {
    letter?: string
}

const LetterBlock = ({letter}: LetterBlockProps) => {

    const {isAppear, onAnimationEnd, localParam: localLetter} = useAppear(letter)

    return (
        <div className={classnames(style.container, { [style.appear]: isAppear }, {[style.invisible]: !localLetter})}
             onAnimationEnd={onAnimationEnd}>
            {localLetter || ' '}
        </div>
    );
};

export default LetterBlock;

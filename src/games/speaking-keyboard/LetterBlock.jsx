import React from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types';

import style from './LetterBlock.module.css'
import useAppear from "./hooks/useAppear";

const LetterBlock = ({letter}) => {

    const {isAppear, onAnimationEnd, localParam: localLetter} = useAppear(letter)

    return (
        <div className={classnames(style.container, { [style.appear]: isAppear }, {[style.invisible]: !localLetter})}
             onAnimationEnd={onAnimationEnd}>
            {localLetter || ' '}
        </div>
    );
};

LetterBlock.propTypes = {
    letter: PropTypes.string,
}

LetterBlock.defaultProps = {
    letter: null,
}

export default LetterBlock;
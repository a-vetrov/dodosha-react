import React, {useEffect, useState} from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types';

import style from './LetterBlock.module.css'

const LetterBlock = ({letter}) => {

    const [isAppear, setIsAppear] = useState(false)
    const [localLetter, setLocalLetter] = useState(null)

    useEffect(() => {
        if (letter) {
            setIsAppear(true)
            setLocalLetter(letter)
        }
    }, [letter])

    const onAnimationEnd = () => {
        setIsAppear(false)
    }

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
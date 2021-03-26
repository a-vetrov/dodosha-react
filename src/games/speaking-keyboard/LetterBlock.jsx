import React, {useEffect, useState} from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types';

import style from './LetterBlock.module.css'

const LetterBlock = ({letter}) => {

    const [isAppear, setIsAppear] = useState(false)

    useEffect(() => {
        setIsAppear(true)
    }, [letter])

    const onAnimationEnd = () => {
        setIsAppear(false)
    }

    return (
        <div className={classnames(style.container, { [style.appear]: isAppear })} onAnimationEnd={onAnimationEnd}>
            {letter || ' '}
        </div>
    );
};

LetterBlock.propTypes = {
    letter: PropTypes.string.isRequired,
}

export default LetterBlock;
import React, {useEffect, useState} from 'react';
import classnames from 'classnames'
import style from './LetterBlock.module.css'

const LetterBlock = ({letter}) => {

    const [isAppear, setIsAppear] = useState(false)

    useEffect(() => {
        setIsAppear(true)
    }, [letter])

    const onAnimationEnd = () => {
        setIsAppear(false)
    }

    if (!letter)
        return null

    return (
        <div className={classnames(style.container, { [style.appear]: isAppear })} onAnimationEnd={onAnimationEnd}>
            {letter || ' '}
        </div>
    );
};

export default LetterBlock;
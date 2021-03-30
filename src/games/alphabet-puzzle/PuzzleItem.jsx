import React from 'react';
import PropTypes from 'prop-types';

import style from './PuzzleItem.module.css'

const PuzzleItem = ({letter, leftItem, rightItem}) => {
    return (
        <div className={style.container}>
            <div className={style.picture}>Picture</div>
            <div className={style.letter}>
                {letter.toUpperCase()}
            </div>
        </div>
    )
}

PuzzleItem.propTypes = {
    letter: PropTypes.string.isRequired,
    leftItem: PropTypes.number.isRequired,
    rightItem: PropTypes.number.isRequired,
}

export default PuzzleItem
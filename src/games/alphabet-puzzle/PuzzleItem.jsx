import React from 'react';
import PropTypes from 'prop-types';

import style from './PuzzleItem.module.css'

const getPositionStyle = p => p ? ({left: `${p.left}px`, top: `${p.top}px`}) : null

const PuzzleItem = ({letter, position}) => {
    return (
        <div className={style.container} style={getPositionStyle(position)}>
            <div className={style.picture}>Picture</div>
            <div className={style.letter}>
                {letter.toUpperCase()}
            </div>
        </div>
    )
}

PuzzleItem.propTypes = {
    letter: PropTypes.string.isRequired,
    position: PropTypes.object.isRequired,
}

export default PuzzleItem
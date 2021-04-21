import React from 'react';
import PropTypes from 'prop-types';

import style from './PuzzleItem.module.css'

const getPositionStyle = p => p ? ({left: `${p.left}px`, top: `${p.top}px`}) : null

const PuzzleItem = React.forwardRef(({item, onMouseDown}, ref) => {

    const handleMouseDown = (e) => onMouseDown(e, item)

    return (
        <div className={style.container} style={getPositionStyle(item.position)} ref={ref} onMouseDown={handleMouseDown}>
            <div className={style.picture}>Picture</div>
            <div className={style.letter}>
                {item.letter.toUpperCase()}
            </div>
        </div>
    )
})

PuzzleItem.propTypes = {
    letter: PropTypes.string.isRequired,
    position: PropTypes.object.isRequired,
}

export default PuzzleItem
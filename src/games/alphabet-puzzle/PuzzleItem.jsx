import React, {useMemo} from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';

import style from './PuzzleItem.module.css'

const getStyle = (position, zIndex) => {
    const s = {zIndex}

    if (position) {
        s.left = `${position.left}px`
        s.top = `${position.top}px`
    }
    return s
}

const PuzzleItem = React.forwardRef(({item, onMouseDown, grabbing, zIndex}, ref) => {

    const handleMouseDown = useMemo(() => (e) => onMouseDown(e, item), [item, onMouseDown])

    const itemStyle = useMemo(() => getStyle(item.position, zIndex), [item.position, zIndex])

    return (
        <div className={classnames(style.container, {[style.grabbing]: grabbing})}
             style={itemStyle}
             ref={ref}
             onMouseDown={handleMouseDown}
        >
            <div className={style.picture}>Picture</div>
            <div className={style.letter}>
                {item.letter.toUpperCase()}
            </div>
        </div>
    )
})

PuzzleItem.propTypes = {
    item: PropTypes.object.isRequired,
    grabbing: PropTypes.bool.isRequired,
    onMouseDown: PropTypes.func,
    zIndex: PropTypes.number.isRequired,
}

export default PuzzleItem
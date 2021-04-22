import React, {useMemo} from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';

import style from './PuzzleItem.module.css'

const PuzzleItem = React.forwardRef(({item, onMouseDown, grabbing, zIndex}, ref) => {

    const handleMouseDown = (e) => onMouseDown(e, item)

    const getStyle = () => {
        const s = {zIndex}

        if (item.position) {
            s.left = `${item.position.left}px`
            s.top = `${item.position.top}px`
        }
        return s
    }

    return (
        <div className={classnames(style.container, {[style.grabbing]: grabbing})}
             style={getStyle()}
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
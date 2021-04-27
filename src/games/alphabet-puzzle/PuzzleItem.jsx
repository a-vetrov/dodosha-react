import React, {useMemo} from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';

import style from './PuzzleItem.module.css'
import {getAlphabetURL} from "../speaking-keyboard/utils";

const getStyle = (position, width, zIndex) => {
    const s = {zIndex}

    if (position) {
        s.left = `${position.left}px`
        s.top = `${position.top}px`
    }
    if (width) {
        s.width = `${width}px`
    }
    return s
}

const getPictureStyle = (img, shift) => {
    console.log('shift', shift)
    const url = getAlphabetURL(img)
    return {
        backgroundImage: `url(${url})`,
        backgroundPositionX: `${shift}px`,
        backgroundPositionY: 'center',
    }
}

const PuzzleItem = React.forwardRef(({item, onMouseDown, grabbing, zIndex, img}, ref) => {

    const handleMouseDown = useMemo(() => (e) => onMouseDown(e, item), [item, onMouseDown])

    const itemStyle = useMemo(() => getStyle(item.position, item.width, zIndex), [item.position.top, item.position.left, item.width, zIndex])

    const letterArr = item.letter.split('')

    const pictureStyle = getPictureStyle(img, item.backgroundShift)

    return (
        <div className={classnames(style.container, {[style.grabbing]: grabbing})}
             style={itemStyle}
             ref={ref}
             onMouseDown={handleMouseDown}
        >
            <div className={style.picture} style={pictureStyle}>Picture</div>
            <div className={style.letter}>
                {letterArr.map((s, index) => <div key={index}>{s}</div>)}
            </div>
        </div>
    )
})

PuzzleItem.propTypes = {
    item: PropTypes.object.isRequired,
    grabbing: PropTypes.bool.isRequired,
    onMouseDown: PropTypes.func,
    zIndex: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
}

export default PuzzleItem
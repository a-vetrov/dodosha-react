import React, {useMemo} from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';

import style from './PuzzleItem.module.css'
import {getAlphabetURL} from "../speaking-keyboard/utils";
import {NO_GRAPHICS_MODE} from "../../__data__/constants";
import {applyForNotTouchable, applyForTouchable,} from "../../utils/adaptive";

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
    const url = getAlphabetURL(img)
    return {
        backgroundImage: NO_GRAPHICS_MODE ? 'none' : `url(${url})`,
        backgroundPositionX: `${shift}px`,
        backgroundPositionY: 'center',
    }
}

const PuzzleItem = React.forwardRef(({item, onMouseDown, grabbing, zIndex, img}, ref) => {

    const handleMouseDown = useMemo(() => applyForNotTouchable((e) => onMouseDown(e, item), null), [item, onMouseDown])

    const handleTouchStart = useMemo(() => applyForTouchable((e) => {
        if (e.targetTouches.length) {
            const {clientX, clientY} = e.targetTouches[0]
            onMouseDown({clientX, clientY}, item)
        }
    }, null), [item, onMouseDown])

    const itemStyle = useMemo(() => getStyle(item.position, item.width, zIndex), [item.position.top, item.position.left, item.width, zIndex])

    const letterArr = useMemo(() => item.letter.split(''), [item.letter])

    const pictureStyle = useMemo(() => getPictureStyle(img, item.backgroundShift), [img, item.backgroundShift])

    return (
        <div className={classnames(style.container, {[style.grabbing]: grabbing})}
             style={itemStyle}
             ref={ref}
             onMouseDown={handleMouseDown}
             onTouchStart={handleTouchStart}
        >
            <div className={style.picture} style={pictureStyle}/>
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

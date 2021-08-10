import React, {RefObject, useMemo} from 'react';
import classnames from "classnames";

import style from './PuzzleItem.module.css'
import {getAlphabetURL} from "../speaking-keyboard/utils";
import {NO_GRAPHICS_MODE} from "../../__data__/constants";
import {applyForNotTouchable, applyForTouchable,} from "../../utils/adaptive";
import Item, {IPosition} from "./data/Item";
import {IDownEvent} from "./interfaces/IDownEvent";


interface IStyle {
    zIndex: number,
    width?: string,
    left?: string,
    top?: string
}

const getStyle = (position: IPosition | null, width: number, zIndex: number) => {
    const s: IStyle = {zIndex}

    if (position) {
        s.left = `${position.left}px`
        s.top = `${position.top}px`
    }
    if (width) {
        s.width = `${width}px`
    }
    return s
}

interface IPictureStyle {
    backgroundImage: string,
    backgroundPositionX: string,
    backgroundPositionY: string
}

const getPictureStyle = (img: string, shift: number): IPictureStyle => {
    const url = getAlphabetURL(img)
    return {
        backgroundImage: NO_GRAPHICS_MODE ? 'none' : `url(${url})`,
        backgroundPositionX: `${shift}px`,
        backgroundPositionY: 'center',
    }
}

type Props = {
    item: Item,
    onMouseDown : (e: IDownEvent, item: Item) => void,
    grabbing: boolean,
    zIndex: number,
    img: string,
}

const PuzzleItem = React.forwardRef<HTMLDivElement, Props>(({item, onMouseDown, grabbing, zIndex, img}, ref) => {

    const handleMouseDown = useMemo(() => applyForNotTouchable((e: IDownEvent) => onMouseDown(e, item), null),
        [item, onMouseDown])

    const handleTouchStart = useMemo(() => applyForTouchable((e: React.TouchEvent) => {
        if (e.targetTouches && e.targetTouches.length) {
            const {clientX, clientY} = e.targetTouches[0]
            onMouseDown({clientX, clientY}, item)
        }
    }, null), [item, onMouseDown])

    const itemStyle = useMemo(() => getStyle(item.position, item.width, zIndex),
        [item.position?.top, item.position?.left, item.width, zIndex])

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


export default PuzzleItem

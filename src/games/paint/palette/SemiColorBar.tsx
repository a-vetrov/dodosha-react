import React from 'react';
import style from './Palette.module.css'
import {useAppDispatch, useAppSelector} from "../../../__data__/hooks";
import {getMainColor, setCurrentColor} from "../../../__data__/slices/paintSlice";
import {interpolateColor} from "../../../utils/interpolateColor";
import {COLORS} from "./config";

const COLOR_STEP = 0.1


const getColorsArray = (currentColor: string): string[] => {
    const arr: string[] = []

    if (currentColor === COLORS.WHITE || currentColor === COLORS.BLACK) {
        for (let i=0; i<=10; i++) {
            arr.push(interpolateColor(COLORS.GRAY, currentColor, i * COLOR_STEP))
        }
        return arr
    }

    const colorFrom = interpolateColor(COLORS.BLACK, currentColor, 0.2)
    const colorTo = interpolateColor(COLORS.WHITE, currentColor, 0.2)

    for (let i=0; i<=5; i++) {
        arr.push(interpolateColor(colorFrom, currentColor, 2 * i * COLOR_STEP))
    }

    for (let i=1; i<=5; i++) {
        arr.push(interpolateColor(currentColor, colorTo, 2 * i * COLOR_STEP))
    }

    return arr
}


const SemiColorBar = () => {

    const currentColor = useAppSelector((state) => getMainColor(state.paint))

    const dispatch = useAppDispatch()

    const handleClick = (color: string) => () => {
        dispatch(setCurrentColor(color))
    }

    const colors = getColorsArray(currentColor)

    return (
        <div className={style.semiColorBar}>
            {colors.map((color) => (
                <div className={style.semiColorBarItem}
                     style={{backgroundColor: color}}
                     onClick={handleClick(color)}
                     key={color}
                />
            ))}
        </div>
    )
}

export default SemiColorBar

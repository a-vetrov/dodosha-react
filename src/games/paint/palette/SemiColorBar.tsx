import React from 'react';
import style from './Palette.module.css'
import {useAppDispatch, useAppSelector} from "../../../__data__/hooks";
import {getMainColor, setCurrentColor} from "../../../__data__/slices/paintSlice";
import {interpolateColor} from "../../../utils/interpolateColor";
import {COLORS} from "./config";

const COLOR_STEP = 0.1

const SemiColorBar = () => {

    const currentColor = useAppSelector((state) => getMainColor(state.paint))

    const colorFrom = interpolateColor(COLORS.BLACK, currentColor, 0.5)
    const colorTo = interpolateColor(COLORS.WHITE, currentColor, 0.5)

    const dispatch = useAppDispatch()

    const handleClick = (color: string) => () => {
        dispatch(setCurrentColor(color))
    }

    const items: React.ReactElement[] = []

    for (let i=0; i<=10; i++) {
        const color = interpolateColor(colorFrom, colorTo, i * COLOR_STEP)
        items.push((
            <div className={style.semiColorBarItem}
                 style={{backgroundColor: color}}
                 onClick={handleClick(color)}
            />
            ))
    }


    return (
        <div className={style.semiColorBar}>
            {items}
        </div>
    );
};

export default SemiColorBar;

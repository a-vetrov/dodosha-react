import React, {CSSProperties} from 'react';

import style from './Palette.module.css'
import {colors} from "./config";
import {useAppDispatch} from "../../../__data__/hooks";
import {setMainColor} from "../../../__data__/slices/paintSlice";
import {interpolateColor} from "../../../utils/interpolateColor";

const getGradient = (color: string): string | undefined => {
    const factor = color === '#ffffff' ? 0.1 : 0.3
    return `linear-gradient(to bottom, ${color}, ${interpolateColor(color, '#000000', factor)})`
}

const getStyle = (color: string): CSSProperties => ({backgroundColor: color, borderColor: color, background: getGradient(color)})

const Palette = () => {

    const dispatch = useAppDispatch()

    const handleClick = (color: string) => () => {
        dispatch(setMainColor(color))
    }

    return (
        <div className={style.colorsContainer}>
            {
                colors.map((color: string) => <div className={style.item} style={getStyle(color)} onClick={handleClick(color)} key={color}/>)
            }
        </div>
    );
};

export default React.memo(Palette);

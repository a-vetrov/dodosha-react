import React, {CSSProperties} from 'react';

import style from './Palette.module.css'
import {colors} from "./config";
import {useAppDispatch} from "../../../__data__/hooks";
import {setMainColor} from "../../../__data__/slices/paintSlice";

const getStyle = (color: string): CSSProperties => ({backgroundColor: color})

const Palette = () => {

    const dispatch = useAppDispatch()

    const handleClick = (color: string) => () => {
        dispatch(setMainColor(color))
    }

    return (
        <div className={style.container}>
            {
                colors.map((color: string) => <div className={style.item} style={getStyle(color)} onClick={handleClick(color)}/>)
            }
        </div>
    );
};

export default Palette;

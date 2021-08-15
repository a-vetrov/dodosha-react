import React from 'react';
import PaintBrush from './PaintBrush';
import style from './Palette.module.css'
import Eraser from "./Eraser";
import {useAppDispatch, useAppSelector} from "../../../__data__/hooks";
import {
    getCurrentInstrument,
    IPaintInstrument,
    setCurrentInstrument
} from "../../../__data__/slices/paintSlice";

const CurrentColorBox = () => {
    const dispatch = useAppDispatch()

    const handleClick = (instrument: IPaintInstrument) => () => {
        dispatch(setCurrentInstrument(instrument))
    }

    const currentInstrument = useAppSelector((state) => getCurrentInstrument(state.paint))

    return (
        <div className={style.currentColorBox}>
            <PaintBrush onClick={handleClick('brush')} isActive={currentInstrument === 'brush'}/>
            <Eraser onClick={handleClick('eraser')} isActive={currentInstrument === 'eraser'}/>
        </div>
    );
};

export default CurrentColorBox;

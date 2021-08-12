import React from 'react';
import CurrentColorBox from './CurrentColorBox';
import Palette from './Palette';
import style from './Palette.module.css'
import SemiColorBar from './SemiColorBar';

const PaletteToolbox = () => {
    return (
        <div className={style.container}>
            <SemiColorBar/>
            <Palette />
            <CurrentColorBox />
        </div>
    );
};

export default PaletteToolbox;

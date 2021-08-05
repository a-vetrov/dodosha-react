import React from 'react';
import style from './MainBackground.module.css'
import {NO_GRAPHICS_MODE} from "../../__data__/constants";

function MainBackground() {

    if (NO_GRAPHICS_MODE)
        return null

    return (
        <div className={style.container}>
            <div className={style.perspectiveCell}>
                <div className={style.ceil} />
            </div>
            <div className={style.wall} />
            <div className={style.perspectiveFloor}>
                <div className={style.floor} />
            </div>
        </div>
    );
}

export default MainBackground;
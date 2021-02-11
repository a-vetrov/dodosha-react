import React from 'react';
import style from './MainBackground.module.css'

function MainBackground() {
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
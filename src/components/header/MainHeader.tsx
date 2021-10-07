import React from 'react';

import style from './MainHeader.module.css'
import cloud from './cloud.svg'

const MainHeader = () => {
    return (
        <header className={style.header}>
            <img src={cloud}/>
        </header>
    );
};


export default MainHeader;
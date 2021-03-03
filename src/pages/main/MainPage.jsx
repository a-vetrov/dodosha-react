import React from 'react';
import { Link } from "react-router-dom";
import {NAVIGATION_URL, NO_GRAPHICS_MODE} from "../../__data__/constants";
import alphabet from './images/alphabet.svg';
import paint from './images/paint.svg'
import style from './MainPage.module.css'


function MainPage() {
    return (
        <nav className={style.nav}>
            <Link to={NAVIGATION_URL.ALPHABET} className={style.link}>
                {NO_GRAPHICS_MODE ? 'Alphabet' : <img src={alphabet} className={style.alphabet}  alt='Изучаем алфавит'/>}
            </Link>
            <Link to={NAVIGATION_URL.PAINT} className={style.link}>
                {NO_GRAPHICS_MODE ? 'Paint' : <img src={paint} className={style.paint} alt='Онлайн раскраски'/>}
            </Link>
        </nav>
    );
}

export default MainPage;

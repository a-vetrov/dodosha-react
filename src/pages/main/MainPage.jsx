import React from 'react';
import { Link } from "react-router-dom";
import {NAVIGATION_URL} from "../../__data__/constants";
import alphabet from './images/alphabet.svg';
import paint from './images/paint.svg'
import style from './MainPage.module.css'


function MainPage() {
    return (
        <nav className={style.nav}>
            <Link to={NAVIGATION_URL.PAINT} className={style.link}>
                <img src={alphabet} className={style.alphabet}/>
            </Link>
            <Link to={NAVIGATION_URL.ALPHABET} className={style.link}>
                <img src={paint} className={style.paint}/>
            </Link>
        </nav>
    );
}

export default MainPage;

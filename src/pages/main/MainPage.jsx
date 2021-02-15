import React from 'react';
import { Link } from "react-router-dom";
import {NAVIGATION_URL} from "../../__data__/constants";
import alphabet from './images/alphabet.svg';
import paint from './images/paint.svg'

function MainPage() {
    return (
        <nav>
            <Link to={NAVIGATION_URL.PAINT}>
                <img src={alphabet} />
            </Link>
            <Link to={NAVIGATION_URL.ALPHABET}>
                <img src={paint} />
            </Link>
        </nav>
    );
}

export default MainPage;

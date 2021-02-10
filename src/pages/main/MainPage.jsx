import React from 'react';
import { Link } from "react-router-dom";
import {NAVIGATION_URL} from "../../__data__/constants";

function MainPage() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={NAVIGATION_URL.PAINT}>Paint</Link>
                </li>
                <li>
                    <Link to={NAVIGATION_URL.ALPHABET}>Alphabet</Link>
                </li>
            </ul>
        </nav>
    );
}

export default MainPage;

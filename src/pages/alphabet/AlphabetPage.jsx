import React from 'react';
import { Link } from "react-router-dom";
import {NAVIGATION_URL} from "../../__data__/constants";
import speakingKeyboardIcon from './images/speaking-keyboard-icon.svg'
import alphabetPuzzleIcon from './images/alphabet-puzzle-icon.svg'
import style from './AlphabetPage.module.css'
import BackButton from "../../components/back-button/BackButton";


function AlphabetPage() {
    return (
        <>
            <BackButton />
            <nav className={style.nav}>
                <Link to={NAVIGATION_URL.ALPHABET_SPEAKING_KEYBOARD} className={style.link}>
                    <img src={speakingKeyboardIcon} className={style.item}/>
                </Link>
                <Link to={NAVIGATION_URL.ALPHABET_ALPHABET_PUZZLE} className={style.link}>
                    <img src={alphabetPuzzleIcon} className={style.item}/>
                </Link>
            </nav>
        </>
    );
}

export default AlphabetPage;

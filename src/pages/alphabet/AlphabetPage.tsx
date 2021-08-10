import React from 'react';
import { Link } from "react-router-dom";
import {NAVIGATION_URL, NO_GRAPHICS_MODE} from "../../__data__/constants";
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
                    {NO_GRAPHICS_MODE ? 'Speaking keyboard' : <img src={speakingKeyboardIcon} className={style.item} alt='Говорящий алфавит'/>}
                </Link>
                <Link to={NAVIGATION_URL.ALPHABET_ALPHABET_PUZZLE} className={style.link}>
                    {NO_GRAPHICS_MODE ? 'Puzzle' : <img src={alphabetPuzzleIcon} className={style.item} alt='Собери слово'/>}
                </Link>
            </nav>
        </>
    );
}

export default AlphabetPage;

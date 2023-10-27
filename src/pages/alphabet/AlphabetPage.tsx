import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import {NAVIGATION_URL, TITLE} from "../../__data__/constants";
import speakingKeyboardIcon from './images/speaking-keyboard-icon.svg'
import alphabetPuzzleIcon from './images/alphabet-puzzle-icon.svg'
import useTitle from '../../utils/hooks/useTitle';
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import PageTemplate from "../../components/page-template/PageTemplate";

import style from './AlphabetPage.module.css'
import templates from "../../styles/templates.module.css";
import LinkItem from "./LinkItem";

const breadCrumbs = [
    {
        caption: 'Изучаем алфавит'
    }
]

const switchToFullScreen = () => {
    document.documentElement.requestFullscreen();
}

function AlphabetPage() {

    useTitle(TITLE.ALPHABET)

    useEffect(() => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        }
    }, [])

    return (
        <PageTemplate>
            <div className={templates.mainFrame}>
                <Breadcrumb items={breadCrumbs}/>
                <h1>Изучаем алфавит</h1>
                <nav className={style.nav}>
                    <Link to={NAVIGATION_URL.ALPHABET_SPEAKING_KEYBOARD} className={style.link} onClick={switchToFullScreen}>
                        <LinkItem title="Говорящий алфавит" image={speakingKeyboardIcon} />
                    </Link>
                    <Link to={NAVIGATION_URL.ALPHABET_ALPHABET_PUZZLE} className={style.link} onClick={switchToFullScreen}>
                        <LinkItem title="Собери слово" image={alphabetPuzzleIcon} />
                    </Link>
                </nav>
            </div>
        </PageTemplate>
    );
}

export default AlphabetPage;

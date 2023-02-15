import React from 'react';
import { Link } from "react-router-dom";
import {TITLE} from "../../__data__/constants";
import style from './MainPage.module.css'
import useTitle from "../../utils/hooks/useTitle";
import config from "./config";
import PageTemplate from "../../components/page-template/PageTemplate";
import MainBlueBox from "./blue-box/BlueBox";


function MainPage() {

    useTitle(TITLE.MAIN)

    return (
        <PageTemplate>
            <div className={style.mainFrame}>
                <h1>Бесплатные развивающие онлайн игры на Додоше</h1>
                <nav className={style.nav}>
                    {
                        config.map((item) => (
                            <Link to={item.href} className={style.link} key={item.title}>
                                <MainBlueBox title={item.title} description={item.description} image={item.image} />
                            </Link>
                        ))
                    }
                </nav>
            </div>
        </PageTemplate>
    );
}

export default MainPage;

import React from 'react';
import { Link } from "react-router-dom";
import style from './BackButton.module.css'
import {NO_GRAPHICS_MODE} from "../../__data__/constants";

const BackButton = () => {

    if (NO_GRAPHICS_MODE)
        return <Link to={'.'} >Назад</Link>

    return (
        <Link to={'.'} className={style.link} />
    );
};

export default BackButton;
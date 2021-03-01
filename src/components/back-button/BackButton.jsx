import React from 'react';
import { Link } from "react-router-dom";
import style from './BackButton.module.css'

const BackButton = () => {

    return (
        <Link to={'.'} className={style.link} />
    );
};

export default BackButton;
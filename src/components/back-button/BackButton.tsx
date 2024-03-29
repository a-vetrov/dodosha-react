import React, {useMemo} from 'react';
import { Link, useLocation } from "react-router-dom";

import style from './BackButton.module.css'
import {NO_GRAPHICS_MODE} from "../../__data__/constants";

const calculateUpPathName = (pathname: string) => {
    const arr = pathname.split('/')
    const last = arr.pop()

    if (arr.length && !last)
        arr.pop()

    return arr.join('/')
}

const BackButton = () => {

    const {pathname} = useLocation()

    const upPathName = useMemo(() => calculateUpPathName(pathname), [pathname])

    if (NO_GRAPHICS_MODE)
        return <Link to={upPathName} className={style['no-graphic-link']}>Назад</Link>

    return (
        <Link to={upPathName} className={style.link} />
    );
};

export default BackButton;

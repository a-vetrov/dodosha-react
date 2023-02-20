import React, {useMemo} from 'react';
import { Link } from "react-router-dom";
import { NAVIGATION_URL } from "../../__data__/constants";
import {IPaintCategory} from "../../__data__/slices/paintSlice";
import style from './CategoryLink.module.css'

const CategoryLink = ({title, url, preview, items}: IPaintCategory) => {
    const image = useMemo(() => {
        const previewUrl = preview || items[0].svg
        return `${process.env.PUBLIC_URL}/paint/${previewUrl}`
    }, [preview, items])

    return (
        <Link to={`${NAVIGATION_URL.PAINT}/${url}`} className={style.link}>
            <div className={style.container}>
                <img src={image} title={title} alt={title} width={200}/>
                <div>{title}</div>
            </div>
        </Link>
    );
};


export default CategoryLink;

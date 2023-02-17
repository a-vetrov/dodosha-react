import React from 'react';
import { Link } from "react-router-dom";
import { NAVIGATION_URL } from "../../__data__/constants";
import {IPaintCategory} from "../../__data__/slices/paintSlice";
import style from './CategoryLink.module.css'

const CategoryLink = ({title, url, items}: IPaintCategory) => {
    const image = `${process.env.PUBLIC_URL}/paint/${items[0].svg}`

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
